import { useState } from "react";
import { useContractReads } from "wagmi";
import { DexContractConfig } from "../config";
import { useExchange } from "./useExchange";

export const useMarket = (tokens) => {
    const { selectedToken } = useExchange();
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

    const { refetch, isLoading } = useContractReads({
        contracts: [
            ...tokens.map(token => ({
                ...DexContractConfig,
                functionName: "getOrders",
                args: [token.ticker, 0],
            })),
            ...tokens.map(token => ({
                ...DexContractConfig,
                functionName: "getOrders",
                args: [token.ticker, 1],
            }))
        ],
        onSuccess(data) {
            console.log(data);
            setBuyOrders({
                BAT: data[0].map(order => {
                    let time = new Date(order.date.toNumber())
                    return {
                        ...order,
                        date: `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`,
                        price: order.price.toNumber()
                    }
                }),
                REP: data[1].map(order => {
                    let time = new Date(order.date.toNumber())
                    return {
                        ...order,
                        date: `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`,
                        price: order.price.toNumber()
                    }
                }),
                ZRX: data[2].map(order => {
                    let time = new Date(order.date.toNumber())
                    return {
                        ...order,
                        date: `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`,
                        price: order.price.toNumber()
                    }
                })
            })
            setSellOrders({
                BAT: data[3].map(order => {
                    let time = new Date(order.date.toNumber())
                    return {
                        ...order,
                        date: `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`,
                        price: order.price.toNumber()
                    }
                }),
                REP: data[4].map(order => {
                    let time = new Date(order.date.toNumber())
                    return {
                        ...order,
                        date: `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`,
                        price: order.price.toNumber()
                    }
                }),
                ZRX: data[5].map(order => {
                    let time = new Date(order.date.toNumber())
                    return {
                        ...order,
                        date: `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`,
                        price: order.price.toNumber()
                    }
                })
            })
        },
        watch: true,
    });

    return {
        selectedToken,
        buyOrders,
        sellOrders,
        isLoading
    }
}