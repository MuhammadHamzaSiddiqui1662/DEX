import { useCallback, useMemo, useState } from "react";
import { BatContractConfig, DaiContractConfig, DexContractConfig, RepContractConfig, SwalConfig, ZrxContractConfig } from "../config";
import { useWalletContext } from "../context/WalletProvider";
import { useAccount, useBalance, useContract, useContractReads, useProvider, useSigner } from 'wagmi';
// import { useApproval } from "./useApproval";
import { BigNumber, ethers } from "ethers";
import { useApprovalErc20 } from "./useApproval";
import { DEX_ADDRESS, TOKENS } from "../config/constants";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { awaitTransaction } from "../utils";
import useNotify from "./useNotify";

export const useWallet = () => {
    const [loading, setLoading] = useState(false);
    const [amount, setAmount] = useState("0");
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
    const { data: signer } = useSigner();
    const provider = useProvider();
    const { isConnected, address, ...account } = useAccount();
    const { data: balance, isLoading: isLoadingBalance } = useBalance({
        address,
    });

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
            // getEthBalance();
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
                    text: "Purchase value can not be zero or empty",
                    icon: "warning",
                    iconColor: "#FF9700",
                });
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
            console.log(response);
            if (response.status) {
                Swal.fire({
                    ...SwalConfig,
                    title: "Successful",
                    text: "Transaction Completed Successfully",
                    icon: "success",
                    iconColor: "#7ED03F",
                    confirmButtonColor: "#00ff22"
                });
                refetch();
                setAmount("0");
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

    const handleTokenChange = useCallback((e) => {
        setSelectedToken(TOKENS.filter(token => token.address === e.target.value)[0] || TOKENS[0])
    }, [])

    const getWalletBalance = () => {
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
    }

    const getDexBalance = () => {
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
    }

    return {
        tokens: TOKENS,
        selectedToken,
        handleTokenChange,
        amount,
        setAmount,
        amountController,
        deposit,
        getWalletBalance,
        getDexBalance,
        provider,
        signer,
        address,
        account,
        isConnected,
        isLoading: loading || isLoading || isLoadingBalance
    }

};