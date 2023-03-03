import { constants, Contract } from "ethers";
import { erc20ABI } from "wagmi";
import useNotify from "./useNotify";
import { useWallet } from "./useWallet";

export const useApprovalErc20 = () => {
    const { notifyLoading, notifySuccess, notifyError, dismissNotify } = useNotify();

    const approve = async (contractAddress, spender, amount, signer, address) => {
        if (!signer) return;

        const notiId = notifyLoading("Approving...");
        const contract = new Contract(contractAddress, erc20ABI, signer);
        // check allowance
        const allowance = await contract.allowance(address, spender);
        // if allowance is lower than amount, approve
        if (amount.gt(allowance)) {
            // approve
            await (await contract.approve(spender, constants.MaxUint256)).wait();
        }
        dismissNotify(notiId);
        notifySuccess("Tokens Approved");
    };

    return { approve };
};
