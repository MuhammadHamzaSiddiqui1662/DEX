import { useCallback, useState } from "react";
import { useContract, erc20ABI, useQuery } from "wagmi";
import { awaitTransaction } from "src/utils";
import { useIsMutating, useMutation } from "@tanstack/react-query";
import useNotify from "./useNotify";
import { constants } from "ethers";
import { useWallet } from "./useWallet";

export const useApproval = ({ contractAddress, owner, spender, amountInWei, amountToApprove }) => {
    const { provider, signer } = useWallet();
    const [error, setError] = useState("");
    const [isError, setIsError] = useState(false);
    const { notifyLoading, notifySuccess, notifyError, dismissNotify } = useNotify();
    const contract = useContract < typeof erc20ABI > ({
        address: contractAddress,
        abi: erc20ABI,
        signerOrProvider: signer || provider,
    });

    const _isApproved = useCallback(async () => {
        const _owner = owner ?? ((await signer?.getAddress()));

        if (!_owner || !amountInWei || !contract) return false;

        if (contractAddress === constants.AddressZero) return true;

        const allowance = await contract.allowance(_owner, spender);
        return allowance.gte(amountInWei);
    }, [contract, contractAddress, signer, owner, spender, amountInWei]);

    const noOfApprovals = useCallback(async () => {
        const _owner = owner ?? ((await signer?.getAddress()));

        if (!_owner || !amountInWei || !contract) return false;

        if (contractAddress === constants.AddressZero) return true;

        const allowance = await contract.allowance(_owner, spender);
        return allowance;
    }, [contract, contractAddress, signer, owner, spender, amountInWei]);

    const {
        data: isApproved,
        refetch: recheckisApproved,
        isLoading,
        isFetching,
    } = useQuery(["isApproved", contractAddress, owner, spender, amountInWei], _isApproved, {
        enabled: !!contractAddress && !!spender && !!amountInWei && !!signer && !!contract,
    });

    const _approve = useCallback(async () => {
        if (!amountInWei || !contract) return false;
        const notiId = notifyLoading("Approving...");
        const res = await awaitTransaction(
            contract.approve(spender, amountToApprove || constants.MaxUint256)
        );
        dismissNotify(notiId);
        if (res.status) {
            recheckisApproved();
            notifySuccess("Tokens Approved");
        } else {
            notifyError("Error Approving Tokens " + res.error);
            setIsError(true);
            setError(res.error);
            throw new Error(res.error);
        }
        return res.status;
    }, [
        contract,
        spender,
        amountInWei,
        amountToApprove,
        dismissNotify,
        notifyError,
        notifyLoading,
        notifySuccess,
        recheckisApproved,
    ]);

    const { mutateAsync: approve } = useMutation(_approve, {
        mutationKey: ["approving", contractAddress, owner, spender, amountInWei],
    });

    const isMutating = useIsMutating(["approving", contractAddress, owner, spender, amountInWei]);

    return {
        isApproved,
        isApproving: isMutating > 0,
        isLoading: isLoading || isFetching,
        approve,
        noOfApprovals,
        isError,
        error,
    };
};
