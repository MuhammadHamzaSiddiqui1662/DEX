import { ethers } from "hardhat";
import { formatBytes32String } from "@ethersproject/strings";
import { BAT_ADDRESS, DAI_ADDRESS, DEX_ADDRESS, REP_ADDRESS, ZRX_ADDRESS } from "../constants";

async function main() {

    const Dex = await ethers.getContractFactory("Dex");

    const dex = await Dex.attach(DEX_ADDRESS);

    await dex.addToken(formatBytes32String("Dai"), DAI_ADDRESS);
    await dex.addToken(formatBytes32String("Bat"), BAT_ADDRESS);
    await dex.addToken(formatBytes32String("Rep"), REP_ADDRESS);
    await dex.addToken(formatBytes32String("Zrx"), ZRX_ADDRESS);

    const tokens = await dex.getTokens();

    console.log("Token List: ", tokens);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
