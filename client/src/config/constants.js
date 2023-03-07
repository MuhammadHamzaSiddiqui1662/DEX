import { ethers } from "ethers";

export const DEX_GRAPH_URL = "https://api.thegraph.com/subgraphs/name/muhammadhamzasiddiqui1662/dex-dumny"

// Goerli Addresses
export const DEX_ADDRESS = "0xA109804edd5C84c9c9Aaf5Bcc583C44A0397eF7b";
export const DAI_ADDRESS = "0x8daa47c2A76730Ed4B9b6085887b788C52C82c57";
export const BAT_ADDRESS = "0x30eD39F8a0A490337290B2095484A30C3DB80A31";
export const REP_ADDRESS = "0x15069E4FC4877505E9b3AE3559e1AB818b2ce82E";
export const ZRX_ADDRESS = "0x4fdDD49d0DdcBd0704bd43E88dd095c1F92862aD";

// Hardhat Addresses
// export const DEX_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
// export const DAI_ADDRESS = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
// export const BAT_ADDRESS = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";
// export const REP_ADDRESS = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9";
// export const ZRX_ADDRESS = "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9";

export const SET_ETH_BALANCE = "SET_ETH_BALANCE";
export const SET_DAI_BALANCE = "SET_DAI_BALANCE";
export const SET_BAT_BALANCE = "SET_BAT_BALANCE";
export const SET_REP_BALANCE = "SET_REP_BALANCE";
export const SET_ZRX_BALANCE = "SET_ZRX_BALANCE";

export const TOKENS = [
    {
        symbol: "DAI",
        name: "DAI Stable Coin",
        address: DAI_ADDRESS,
        ticker: ethers.utils.formatBytes32String("DAI"),
        decimals: 18,
        logo: "",
    },
    {
        symbol: "BAT",
        name: "Basic Attention Token",
        address: BAT_ADDRESS,
        ticker: ethers.utils.formatBytes32String("BAT"),
        decimals: 18,
        logo: "",
    },
    {
        symbol: "REP",
        name: "Reputation Token",
        address: REP_ADDRESS,
        ticker: ethers.utils.formatBytes32String("REP"),
        decimals: 18,
        logo: "",
    },
    {
        symbol: "ZRX",
        name: "0x Token",
        address: ZRX_ADDRESS,
        ticker: ethers.utils.formatBytes32String("ZRX"),
        decimals: 18,
        logo: "",
    },
]