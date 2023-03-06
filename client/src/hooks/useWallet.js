import { useCallback, useMemo, useState } from "react";
import { BatContractConfig, DaiContractConfig, DexContractConfig, RepContractConfig, SwalConfig, ZrxContractConfig } from "../config";
import { useWalletContext } from "../context/WalletProvider";
import { useAccount, useBalance, useContract, useContractReads, useProvider, useSigner } from 'wagmi';
import { BigNumber, ethers } from "ethers";
import { useApprovalErc20 } from "./useApproval";
import { DEX_ADDRESS, TOKENS } from "../config/constants";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { awaitTransaction } from "../utils";
import useNotify from "./useNotify";
import { useConnectModal } from '@rainbow-me/rainbowkit';

export const useWallet = () => {
    const [loading, setLoading] = useState(false);
    const { data: signer } = useSigner();
    const provider = useProvider();
    const { isConnected, address, ...account } = useAccount();
    const { data: balance, isLoading: isLoadingBalance } = useBalance({
        address,
    });
    const { openConnectModal } = useConnectModal();

    const [amount, setAmount] = useState("");
    const amountController = useMemo(() => ({
        value: amount,
        setValue: setAmount
    }), [amount])

    const [dexBalance, setDexBalance] = useState({
        daiBalance: BigNumber.from(0),
        batBalance: BigNumber.from(0),
        repBalance: BigNumber.from(0),
        zrxBalance: BigNumber.from(0)
    })
    const [selectedToken, setSelectedToken] = useState(TOKENS[0]);
    const handleTokenChange = useCallback((e) => {
        setSelectedToken(TOKENS.filter(token => token.address === e.target.value)[0] || TOKENS[0])
    }, [])

    const { notifyLoading, dismissNotify, notifySuccess, notifyError } = useNotify();

    const { approve } = useApprovalErc20();

    const {
        daiBalance,
        batBalance,
        repBalance,
        zrxBalance,
        setDaiBalance,
        setBatBalance,
        setRepBalance,
        setZrxBalance } = useWalletContext();

    const { refetch, isLoading } = useContractReads({
        contracts: [
            {
                ...DaiContractConfig,
                functionName: "balanceOf",
                args: [address],
            },
            {
                ...BatContractConfig,
                functionName: "balanceOf",
                args: [address],
            },
            {
                ...RepContractConfig,
                functionName: "balanceOf",
                args: [address],
            },
            {
                ...ZrxContractConfig,
                functionName: "balanceOf",
                args: [address],
            },
            ...TOKENS.map(token => ({
                ...DexContractConfig,
                functionName: "traderBalances",
                args: [address, token.ticker],
            }))
        ],
        onSuccess(data) {
            setDaiBalance(data[0]);
            setBatBalance(data[1]);
            setRepBalance(data[2]);
            setZrxBalance(data[3]);
            setDexBalance({
                daiBalance: data[4],
                batBalance: data[5],
                repBalance: data[6],
                zrxBalance: data[7]
            })
        },
        watch: true,
    });

    const dexContract = useContract({
        ...DexContractConfig,
        signerOrProvider: signer,
    });

    const deposit = async () => {
        if (!dexContract) return;
        setLoading(true);
        const notifyId = notifyLoading("Transaction in progress...");
        try {
            if (!amountController.value || parseFloat(amountController.value) <= 0) {
                Swal.fire({
                    ...SwalConfig,
                    title: "Warning!",
                    text: "Can not deposite ZERO or NULL value.",
                    icon: "warning",
                    iconColor: "#FF9700",
                });
                notifyError(`Error: Zero or NULL value`)
                setLoading(false);
                return;
            }

            await approve(selectedToken.address, DEX_ADDRESS, ethers.utils.parseEther(amountController.value), signer, address)

            const response = await awaitTransaction(
                dexContract.deposit(
                    ethers.utils.parseEther(amountController.value),
                    selectedToken.ticker
                )
            );
            if (response.status) {
                Swal.fire({
                    ...SwalConfig,
                    title: "Successful",
                    text: "Transaction Completed Successfully",
                    icon: "success",
                    iconColor: "#00ff22",
                    confirmButtonColor: "#00ff22"
                });
                refetch();
                amountController.setValue("0");
                notifySuccess("Transaction Completed.")
            } else {
                Swal.fire({
                    ...SwalConfig,
                    title: "Error",
                    text: response.error,
                    icon: "error",
                    iconColor: "#E56672",
                });
                notifyError(`Error: ${response.error}`)
            }

            setLoading(false);
            return response.status;
        } catch (error) {
            Swal.fire({
                ...SwalConfig,
                title: "Error",
                text: error,
                icon: "error",
                iconColor: "#E56672",
            });
            notifyError(`Error: ${error.message}`)
            setLoading(false);
            return false;
        } finally {
            dismissNotify(notifyId);
        }
    }

    const withdraw = async () => {
        if (!dexContract) return;
        setLoading(true);
        const notifyId = notifyLoading("Transaction in progress...");
        try {
            if (!amountController.value || parseFloat(amountController.value) <= 0) {
                Swal.fire({
                    ...SwalConfig,
                    title: "Warning!",
                    text: "Can not withdraw ZERO or NULL value.",
                    icon: "warning",
                    iconColor: "#FF9700",
                });
                notifyError(`Error: Zero or NULL value`)
                setLoading(false);
                return;
            }

            const response = await awaitTransaction(
                dexContract.withdraw(
                    ethers.utils.parseEther(amountController.value),
                    selectedToken.ticker
                )
            );

            if (response.status) {
                Swal.fire({
                    ...SwalConfig,
                    title: "Successful",
                    text: "Transaction Completed Successfully",
                    icon: "success",
                    iconColor: "#00ff22",
                    confirmButtonColor: "#00ff22"
                });
                refetch();
                amountController.setValue("0");
                notifySuccess("Transaction Completed.")
            } else {
                Swal.fire({
                    ...SwalConfig,
                    title: "Error",
                    text: response.error,
                    icon: "error",
                    iconColor: "#E56672",
                });
                notifyError(`Error: ${response.error}`)
            }

            setLoading(false);
            return response.status;
        } catch (error) {
            Swal.fire({
                ...SwalConfig,
                title: "Error",
                text: error,
                icon: "error",
                iconColor: "#E56672",
            });
            notifyError(`Error: ${error.message}`)
            setLoading(false);
            return false;
        } finally {
            dismissNotify(notifyId);
        }
    }

    const getWalletBalance = useCallback(() => {
        if (!isConnected) return BigNumber.from(0);
        switch (selectedToken.symbol) {
            case "ETH":
                return balance;
            case "DAI":
                return daiBalance;
            case "BAT":
                return batBalance;
            case "REP":
                return repBalance;
            case "ZRX":
                return zrxBalance;

            default:
                return BigNumber.from(0);
        }
    }, [selectedToken, balance, daiBalance, batBalance, repBalance, zrxBalance, isConnected])

    const getDexBalance = useCallback(() => {
        if (!isConnected) return BigNumber.from(0);
        switch (selectedToken.symbol) {
            case "DAI":
                return dexBalance.daiBalance;
            case "BAT":
                return dexBalance.batBalance;
            case "REP":
                return dexBalance.repBalance;
            case "ZRX":
                return dexBalance.zrxBalance;

            default:
                return BigNumber.from(0);
        }
    }, [selectedToken, dexBalance, isConnected])

    return {
        tokens: TOKENS,
        selectedToken,
        handleTokenChange,
        amountController,
        deposit,
        withdraw,
        getWalletBalance,
        getDexBalance,
        refetch,
        provider,
        signer,
        address,
        account,
        isConnected,
        connectWallet: openConnectModal,
        isLoading: loading || isLoading || isLoadingBalance
    }

};