import { useCallback, useMemo, useState } from "react";
import { useContractReads } from "wagmi";
import { getBatTrades, getRepTrades, getTrades, getZrxTrades } from "../api/market";
import { DexContractConfig } from "../config";

export const useMarket = (tokens, selectedToken) => {
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
    const [trades, setTrades] = useState([])
    const [batTrades, setBatTrades] = useState([])
    const [repTrades, setRepTrades] = useState([])
    const [zrxTrades, setZrxTrades] = useState([])

    const { isLoading } = useContractReads({
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
            // setBuyOrders({
            //     BAT: data[0].map(order => {
            //         let time = new Date(order.date.toNumber())
            //         return {
            //             ...order,
            //             date: `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`,
            //             price: order.price.toNumber()
            //         }
            //     }),
            //     REP: data[1].map(order => {
            //         let time = new Date(order.date.toNumber())
            //         return {
            //             ...order,
            //             date: `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`,
            //             price: order.price.toNumber()
            //         }
            //     }),
            //     ZRX: data[2].map(order => {
            //         let time = new Date(order.date.toNumber())
            //         return {
            //             ...order,
            //             date: `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`,
            //             price: order.price.toNumber()
            //         }
            //     })
            // })
            // setSellOrders({
            //     BAT: data[3].map(order => {
            //         let time = new Date(order.date.toNumber())
            //         return {
            //             ...order,
            //             date: `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`,
            //             price: order.price.toNumber()
            //         }
            //     }),
            //     REP: data[4].map(order => {
            //         let time = new Date(order.date.toNumber())
            //         return {
            //             ...order,
            //             date: `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`,
            //             price: order.price.toNumber()
            //         }
            //     }),
            //     ZRX: data[5].map(order => {
            //         let time = new Date(order.date.toNumber())
            //         return {
            //             ...order,
            //             date: `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`,
            //             price: order.price.toNumber()
            //         }
            //     })
            // })
            getTrades()
                .then(res => setTrades(res))
                .catch(err => console.log(err));
            getBatTrades()
                .then(res => setBatTrades(res))
                .catch(err => console.log(err));
            getRepTrades()
                .then(res => setRepTrades(res))
                .catch(err => console.log(err));
            getZrxTrades()
                .then(res => setZrxTrades(res))
                .catch(err => console.log(err));
        },
        watch: true,
    });

    return {
        selectedToken,
        // buyOrders,
        // sellOrders,
        trades,
        batTrades,
        repTrades,
        zrxTrades,
        isLoading
    }
}