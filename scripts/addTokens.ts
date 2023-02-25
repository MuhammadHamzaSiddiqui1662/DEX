import { ethers } from "hardhat";
import { BAT, BAT_ADDRESS, DAI, DAI_ADDRESS, DEX_ADDRESS, REP, REP_ADDRESS, ZRX, ZRX_ADDRESS } from "../constants";

async function main() {

    const Dex = await ethers.getContractFactory("Dex");

    const dex = await Dex.attach(DEX_ADDRESS);

    await dex.addToken(DAI, DAI_ADDRESS);
    await dex.addToken(BAT, BAT_ADDRESS);
    await dex.addToken(REP, REP_ADDRESS);
    await dex.addToken(ZRX, ZRX_ADDRESS);

    const tokens = await dex.getTokens();

    console.log("Token List: ", tokens);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
