import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";
dotenv.config();

const PRIVATE_KEY = process.env.PRIVATE_KEY;
const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL;
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "key";

const config: HardhatUserConfig = {
  solidity: {
    compilers: [{ version: "0.8.0" }, { version: "0.8.17" }],
  },
  networks: {
    goerli: {
      url: GOERLI_RPC_URL || "",
      accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
      chainId: 5,
    },
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY
  },
};

export default config;
