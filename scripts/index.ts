import { ethers } from "hardhat";
import { DEX_ADDRESS } from "../constants";
import { verify } from "../utils/verify";

async function main() {
    const args: any[] = [];
    const accounts = await ethers.getSigners();
    const deployer = accounts[0];

    const Dex = await ethers.getContractFactory("Dex");

    // const dex = await Dex.deploy(...args);
    // await dex.deployed();
    // console.log(`DEX Contract Deployed at address: ${dex.address} by signer: ${deployer.address}`);
    // if (process.env.ETHERSCAN_API_KEY) {
    //     console.log("Verifying Contract...");
    //     await verify(dex.address, args);
    //     console.log("Verified!");
    // }

    const dex = await Dex.attach(DEX_ADDRESS);
    const tokens = await dex.getTokens();
    console.log("Token List: ", tokens.length);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
