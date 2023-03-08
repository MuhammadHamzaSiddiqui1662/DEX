import axios from "axios";
import { ethers } from "ethers";
import { DEX_GRAPH_URL } from "../config/constants";

export const getTrades = async () => {
    const { data: { data: { newTrades } } } = await axios.post(DEX_GRAPH_URL, {
        query: `{
            newTrades(orderBy: date) {
                id
                tradeId
                orderId
                ticker
                date
                price
            }
        }`,
    })
    newTrades.forEach(trade => {
        trade.price = Number(ethers.utils.formatEther(trade.price));
        let time = new Date(Number(trade.date) * 1000);
        trade.date = `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`
    });
    return newTrades;
}

export const getBatTrades = async () => {
    const { data: { data: { newTrades } } } = await axios.post(DEX_GRAPH_URL, {
        query: `{
            newTrades(orderBy: date, where: {ticker: "${ethers.utils.formatBytes32String("BAT")}"}) {
                id
                tradeId
                orderId
                ticker
                date
                price
            }
        }`,
    })
    newTrades.forEach(trade => {
        trade.price = Number(ethers.utils.formatEther(trade.price));
        let time = new Date(Number(trade.date) * 1000);
        trade.date = `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`
    });
    return newTrades;
}

export const getRepTrades = async () => {
    const { data: { data: { newTrades } } } = await axios.post(DEX_GRAPH_URL, {
        query: `{
            newTrades(orderBy: date, where: {ticker: "${ethers.utils.formatBytes32String("REP")}"}) {
                id
                tradeId
                orderId
                ticker
                date
                price
            }
        }`,
    })
    newTrades.forEach(trade => {
        trade.price = Number(ethers.utils.formatEther(trade.price));
        let time = new Date(Number(trade.date) * 1000);
        trade.date = `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`
    });
    return newTrades;
}

export const getZrxTrades = async () => {
    const { data: { data: { newTrades } } } = await axios.post(DEX_GRAPH_URL, {
        query: `{
            newTrades(orderBy: date, where: {ticker: "${ethers.utils.formatBytes32String("ZRX")}"}) {
                id
                tradeId
                orderId
                ticker
                date
                price
            }
        }`,
    })
    newTrades.forEach(trade => {
        trade.price = Number(ethers.utils.formatEther(trade.price));
        let time = new Date(Number(trade.date) * 1000);
        trade.date = `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`
    });
    return newTrades;
}