import { useCallback } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useNotify = () => {
    const notifySystem = useCallback(
        (title, message, type) => {
            console.log(`Notify: ${title} Message: ${message} Type: ${type}`);
        },
        []
    );

    const notifySuccess = useCallback((message) => {
        toast.success(message, {
            position: toast.POSITION.TOP_RIGHT
        });
    }, []);

    const notifyError = useCallback((message) => {
        toast.error(message);
    }, []);

    const notifyLoading = useCallback((message) => {
        const id = toast.loading(message);
        return id;
    }, []);

    const dismissNotify = useCallback((id) => toast.dismiss(id), []);
    const dismissNotifyAll = useCallback(() => toast.dismiss(), []);

    return {
        notifySystem,
        notifySuccess,
        notifyError,
        notifyLoading,
        dismissNotify,
        dismissNotifyAll,
    };
};

export default useNotify;
