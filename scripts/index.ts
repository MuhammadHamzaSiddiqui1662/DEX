import { ethers } from "hardhat";
import { ADDRESS_1, DEX_ADDRESS } from "../constants";
import { formatBytes32String } from "@ethersproject/strings";
import { verify } from "../utils/verify";

async function main() {
    const args: any[] = [];
    const accounts = await ethers.getSigners();
    const deployer = accounts[0];

    const Dex = await ethers.getContractFactory("Dex");
    const dex = await Dex.attach(DEX_ADDRESS);
    await dex.deposit(ethers.utils.parseEther("100"), formatBytes32String("Dai"), { from: ADDRESS_1 });

    // const dex = await Dex.deploy(...args);
    // await dex.deployed();
    // console.log(`DEX Contract Deployed at address: ${dex.address} by signer: ${deployer.address}`);
    // if (process.env.ETHERSCAN_API_KEY) {
    //     console.log("Verifying Contract...");
    //     await verify(dex.address, args);
    //     console.log("Verified!");
    // }

    // const tokens = await dex.getTokens();
    // console.log("Token List: ", tokens.length);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
