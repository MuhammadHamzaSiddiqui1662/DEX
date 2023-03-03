import { useMemo, useState } from "react";
import { DexContractConfig, SwalConfig } from "../config";
import { useContract } from 'wagmi';
import { ethers } from "ethers";
import { DEX_ADDRESS, TOKENS } from "../config/constants";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { awaitTransaction } from "../utils";
import useNotify from "./useNotify";
import { useWallet } from "./useWallet";

const ORDER_TYPES = ["Limit", "Market"];

export const useExchange = () => {
    const [loading, setLoading] = useState(false);
    const {
        signer,
        amountController,
        selectedToken,
        handleTokenChange,
        getDexBalance,
        getWalletBalance,
        isConnected,
        isLoading
    } = useWallet();

    const [price, setPrice] = useState("");
    const priceController = useMemo(() => ({
        value: price,
        setValue: setPrice
    }), [price])

    const [orderType, setOrderType] = useState(ORDER_TYPES[0]);
    const orderTypeController = useMemo(() => ({
        value: orderType,
        setValue: setOrderType
    }), [orderType])

    const { notifyLoading, dismissNotify, notifySuccess, notifyError } = useNotify();

    const dexContract = useContract({
        ...DexContractConfig,
        signerOrProvider: signer,
    });

    // const createMarketOrder = async () => {
    //     if (!dexContract) return;
    //     setLoading(true);
    //     const notifyId = notifyLoading("Transaction in progress...");
    //     try {
    //         if (!amountController.value || parseFloat(amountController.value) <= 0) {
    //             Swal.fire({
    //                 ...SwalConfig,
    //                 title: "Warning!",
    //                 text: "Can not deposite ZERO or NULL value.",
    //                 icon: "warning",
    //                 iconColor: "#FF9700",
    //             });
    //             notifyError(`Error: Zero or NULL value`)
    //             setLoading(false);
    //             return;
    //         }

    //         await approve(selectedToken.address, DEX_ADDRESS, ethers.utils.parseEther(amountController.value), signer, address)

    //         const response = await awaitTransaction(
    //             dexContract.deposit(
    //                 ethers.utils.parseEther(amountController.value),
    //                 selectedToken.ticker
    //             )
    //         );
    //         if (response.status) {
    //             Swal.fire({
    //                 ...SwalConfig,
    //                 title: "Successful",
    //                 text: "Transaction Completed Successfully",
    //                 icon: "success",
    //                 iconColor: "#7ED03F",
    //                 confirmButtonColor: "#00ff22"
    //             });
    //             refetch();
    //             setAmount("0");
    //             notifySuccess("Transaction Completed.")
    //         } else {
    //             Swal.fire({
    //                 ...SwalConfig,
    //                 title: "Error",
    //                 text: response.error,
    //                 icon: "error",
    //                 iconColor: "#E56672",
    //             });
    //             notifyError(`Error: ${response.error}`)
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
    //         notifyError(`Error: ${error.message}`)
    //         setLoading(false);
    //         return false;
    //     } finally {
    //         dismissNotify(notifyId);
    //     }
    // }

    // const withdraw = async () => {
    //     if (!dexContract) return;
    //     setLoading(true);
    //     const notifyId = notifyLoading("Transaction in progress...");
    //     try {
    //         if (!amountController.value || parseFloat(amountController.value) <= 0) {
    //             Swal.fire({
    //                 ...SwalConfig,
    //                 title: "Warning!",
    //                 text: "Can not withdraw ZERO or NULL value.",
    //                 icon: "warning",
    //                 iconColor: "#FF9700",
    //             });
    //             notifyError(`Error: Zero or NULL value`)
    //             setLoading(false);
    //             return;
    //         }

    //         const response = await awaitTransaction(
    //             dexContract.withdraw(
    //                 ethers.utils.parseEther(amountController.value),
    //                 selectedToken.ticker
    //             )
    //         );

    //         if (response.status) {
    //             Swal.fire({
    //                 ...SwalConfig,
    //                 title: "Successful",
    //                 text: "Transaction Completed Successfully",
    //                 icon: "success",
    //                 iconColor: "#7ED03F",
    //                 confirmButtonColor: "#00ff22"
    //             });
    //             refetch();
    //             setAmount("0");
    //             notifySuccess("Transaction Completed.")
    //         } else {
    //             Swal.fire({
    //                 ...SwalConfig,
    //                 title: "Error",
    //                 text: response.error,
    //                 icon: "error",
    //                 iconColor: "#E56672",
    //             });
    //             notifyError(`Error: ${response.error}`)
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
    //         notifyError(`Error: ${error.message}`)
    //         setLoading(false);
    //         return false;
    //     } finally {
    //         dismissNotify(notifyId);
    //     }
    // }

    return {
        tokens: TOKENS,
        ORDER_TYPES,
        selectedToken,
        handleTokenChange,
        amountController,
        priceController,
        orderTypeController,
        getWalletBalance,
        getDexBalance,
        isConnected,
        isLoading: loading || isLoading
    }

};