import { ethers } from "ethers";
import { useCallback, useState } from "react";
import { useContractReads } from "wagmi";
import { DexContractConfig } from "../config";

import { TOKENS as ALL_TOKENS } from "../config/constants";
const TOKENS = ALL_TOKENS.filter(token => token.symbol !== "DAI");

export const useOrderBook = (tokens) => {
    const [buyOrders, setBuyOrders] = useState({
        bat: [],
        rep: [],
        zrx: []
    })
    const [sellOrders, setSellOrders] = useState({
        bat: [],
        rep: [],
        zrx: []
    })

    const [selectedToken, setSelectedToken] = useState(TOKENS[0]);
    const handleTokenChange = useCallback((e) => {
        setSelectedToken(TOKENS.filter(token => token.address === e.target.value)[0] || TOKENS[0])
    }, [])

    const { isLoading } = useContractReads({
        contracts: [
            ...TOKENS.map(token => ({
                ...DexContractConfig,
                functionName: "getOrders",
                args: [token.ticker, 0],
            })),
            ...TOKENS.map(token => ({
                ...DexContractConfig,
                functionName: "getOrders",
                args: [token.ticker, 1],
            }))
        ],
        onSuccess(data) {
            setBuyOrders({
                BAT: data[0]?.map(order => {
                    let time = new Date(order.date.toNumber())
                    return {
                        ...order,
                        date: `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`,
                        price: ethers.utils.formatEther(order.price)
                    }
                }) || [],
                REP: data[1]?.map(order => {
                    let time = new Date(order.date.toNumber())
                    return {
                        ...order,
                        date: `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`,
                        price: ethers.utils.formatEther(order.price)
                    }
                }) || [],
                ZRX: data[2]?.map(order => {
                    let time = new Date(order.date.toNumber())
                    return {
                        ...order,
                        date: `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`,
                        price: ethers.utils.formatEther(order.price)
                    }
                }) || []
            })
            setSellOrders({
                BAT: data[3]?.map(order => {
                    let time = new Date(order.date.toNumber())
                    return {
                        ...order,
                        date: `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`,
                        price: ethers.utils.formatEther(order.price)
                    }
                }) || [],
                REP: data[4]?.map(order => {
                    let time = new Date(order.date.toNumber())
                    return {
                        ...order,
                        date: `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`,
                        price: ethers.utils.formatEther(order.price)
                    }
                }) || [],
                ZRX: data[5]?.map(order => {
                    let time = new Date(order.date.toNumber())
                    return {
                        ...order,
                        date: `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`,
                        price: ethers.utils.formatEther(order.price)
                    }
                }) || []
            })
        },
        watch: true,
    });

    return {
        TOKENS,
        selectedToken,
        handleTokenChange,
        buyOrders,
        sellOrders,
        isLoading
    }
}