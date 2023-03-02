import React from "react";
import { BigNumber } from "ethers";
import { SET_BAT_BALANCE, SET_DAI_BALANCE, SET_ETH_BALANCE, SET_REP_BALANCE, SET_ZRX_BALANCE } from "../config/constants";

const initialValues = {
    ethBalance: BigNumber.from(0),
    daiBalance: BigNumber.from(0),
    batBalance: BigNumber.from(0),
    repBalance: BigNumber.from(0),
    zrxBalance: BigNumber.from(0),
    setEthBalance: (data) => { },
    setDaiBalance: (data) => { },
    setBatBalance: (data) => { },
    setRepBalance: (data) => { },
    setZrxBalance: (data) => { }
};

const WalletContext = React.createContext(initialValues);

export const useWalletContext = () => React.useContext(WalletContext);

const walletReducer = (state, action) => {
    switch (action.type) {
        case SET_ETH_BALANCE: {
            return {
                ...state,
                ethBalance: action.payload,
            };
        }
        case SET_DAI_BALANCE: {
            return {
                ...state,
                daiBalance: action.payload,
            };
        }
        case SET_BAT_BALANCE: {
            return {
                ...state,
                batBalance: action.payload,
            };
        }
        case SET_REP_BALANCE: {
            return {
                ...state,
                repBalance: action.payload,
            };
        }
        case SET_ZRX_BALANCE: {
            return {
                ...state,
                zrxBalance: action.payload,
            };
        }
    }
};

export const WalletProvider = ({ children }) => {
    const [state, dispatch] = React.useReducer(walletReducer, initialValues);

    const setEthBalance = (data) => {
        dispatch({
            type: SET_ETH_BALANCE,
            payload: data,
        });
    };
    const setDaiBalance = (data) => {
        dispatch({
            type: SET_DAI_BALANCE,
            payload: data,
        });
    };
    const setBatBalance = (data) => {
        dispatch({
            type: SET_BAT_BALANCE,
            payload: data,
        });
    };
    const setRepBalance = (data) => {
        dispatch({
            type: SET_REP_BALANCE,
            payload: data,
        });
    };
    const setZrxBalance = (data) => {
        dispatch({
            type: SET_ZRX_BALANCE,
            payload: data,
        });
    };

    return (
        <WalletContext.Provider
            value={{
                ethBalance: state.ethBalance,
                daiBalance: state.daiBalance,
                batBalance: state.batBalance,
                repBalance: state.repBalance,
                zrxBalance: state.zrxBalance,
                setEthBalance,
                setDaiBalance,
                setBatBalance,
                setRepBalance,
                setZrxBalance
            }}
        >
            {children}
        </WalletContext.Provider>
    );
};
