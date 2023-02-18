import { ethers } from "hardhat";
import { DEX_ADDRESS } from "../constants";

async function main() {
    const Dex = await ethers.getContractFactory("Dex");

    const dex = await Dex.attach(DEX_ADDRESS);

    const tokens = await dex.getTokens();

    console.log("Token List: ", tokens.length);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
