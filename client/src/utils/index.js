import useNotify from "../hooks/useNotify";

export const truncateAddress = (address) => {
    if (!address) return "No Account";
    const match = address.match(/^(0x[a-zA-Z0-9]{2})[a-zA-Z0-9]+([a-zA-Z0-9]{2})$/);
    if (!match) return address;
    return `${match[1]}…${match[2]}`;
};

export const awaitTransaction = async (transaction) => {
    let tx;
    let receipt;
    let error;
    let status;

    // const { notifyLoading, dismissNotify, notifySuccess, notifyError } = useNotify();
    // const notifyId = notifyLoading("Transaction in progress...");

    try {
        tx = await transaction;
        receipt = await tx.wait();
        status = true;
        // notifySuccess("Transaction Completed.")
    } catch (e) {
        console.log(e);
        if (e.reason) error = e.reason.replace("execution reverted:", "");
        else if (e.code === 4001) error = "Transaction Denied!";
        else if (e.code === -32000)
            error = "Insuficient Funds in your account for transaction";
        else if (e.data?.code === -32000)
            error = "Insuficient Funds in your account for transaction";
        else if (e.data?.message) error = e.data.message;
        else if (e.message) error = e.message;
        status = false;
        // notifyError(`Error: ${e.message}`)
    } finally {
        // dismissNotify(notifyId);
    }
    return {
        tx,
        receipt,
        error,
        status,
    };
};