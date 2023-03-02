import { useState } from "react";
import { BatContractConfig, DaiContractConfig, DexContractConfig, RepContractConfig, ZrxContractConfig } from "../config";
import { useWalletContext } from "../context/WalletProvider";
import { useAccount, useBalance, useContract, useContractReads, useProvider, useSigner } from 'wagmi';
// import { useApproval } from "./useApproval";
import { ethers } from "ethers";

export const useWallet = () => {
    const [loading, setLoading] = useState(false);
    const [amount, setAmount] = useState("0");
    const { data: signer } = useSigner();
    const provider = useProvider();
    const { isConnected, address, ...account } = useAccount();
    const { data: balance, isLoading: isLoadingBalance } = useBalance({
        address,
    });

    const {
        ethBalance,
        daiBalance,
        batBalance,
        repBalance,
        zrxBalance,
        setEthBalance,
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
        ],
        onSuccess(data) {
            // getEthBalance();
            setDaiBalance(data[0]);
            setBatBalance(data[1]);
            setRepBalance(data[2]);
            setZrxBalance(data[3]);
        },
        watch: true,
    });

    // const getEthBalance = useCallback(async () => {
    //     if (!signer) return;
    //     setLoading(true);
    //     const ethBalance = await signer.getBalance();
    //     setEthBalance(ethBalance);
    //     setLoading(false);
    // }, [signer, setEthBalance]);

    const dexContract = useContract({
        ...DexContractConfig,
        signerOrProvider: signer,
    });
    // const approval = useApproval({
    //     contractAddress: Contracts.usdc,
    //     spender: Contracts.preSale,
    //     amountInWei: ethers.constants.MaxUint256.toString(),
    // });

    // const deposit = async (token) => {
    //     if (!dexContract) return;
    //     setLoading(true);
    //     try {
    //         if (!!amount) {
    //             Swal.fire({
    //                 ...SwalConfig,
    //                 title: "Warning!",
    //                 text: "Purchase value can not be zero",
    //                 icon: "warning",
    //                 iconColor: "#FF9700",
    //             });
    //             setLoading(false);
    //             return;
    //         }

    //         // if USDC is payment method, approve first USDC
    //         // if (amount !== "0" && !approval.isApproved) {
    //         //     await approval.approve();
    //         // }

    //         const response = await awaitTransaction(
    //             dexContract.deposit(
    //                 amount,
    //                 ethers.utils.formatBytes32String(token)
    //             )
    //         );
    //         if (response.status) {
    //             Swal.fire({
    //                 ...SwalConfig,
    //                 title: "Successful",
    //                 text: "Transaction Completed Successfully",
    //                 icon: "success",
    //                 iconColor: "#7ED03F",
    //             });
    //             refetch();
    //         } else {
    //             Swal.fire({
    //                 ...SwalConfig,
    //                 title: "Error",
    //                 text: response.error,
    //                 icon: "error",
    //                 iconColor: "#E56672",
    //             });
    //         }

    //         setLoading(false);
    //         return response.status;
    //     } catch (error) {
    //         Swal.fire({
    //             ...SwalConfig,
    //             title: "Error",
    //             text: error,
    //             icon: "error",
    //             iconColor: "#E56672",
    //         });
    //         setLoading(false);
    //         return false;
    //     }
    // };

    return {
        // deposit,
        balance,
        daiBalance,
        batBalance,
        repBalance,
        zrxBalance,
        provider,
        signer,
        address,
        account,
        isConnected,
        isLoading: loading || isLoading || isLoadingBalance
    }

};