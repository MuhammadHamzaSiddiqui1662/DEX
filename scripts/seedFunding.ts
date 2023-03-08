import { ethers } from "hardhat";
import { ADDRESS_1, ADDRESS_2, BAT_ADDRESS, DAI_ADDRESS, REP_ADDRESS, ZRX_ADDRESS } from "../constants";
import { seedTokenBalance } from "../utils/seedTokenBalance";

async function main() {

    const Dai = await ethers.getContractFactory("Dai");
    const dai = await Dai.attach(DAI_ADDRESS);
    const Bat = await ethers.getContractFactory("Bat");
    const bat = await Bat.attach(BAT_ADDRESS);
    const Rep = await ethers.getContractFactory("Rep");
    const rep = await Rep.attach(REP_ADDRESS);
    const Zrx = await ethers.getContractFactory("Zrx");
    const zrx = await Zrx.attach(ZRX_ADDRESS);

    const amount = ethers.utils.parseEther('5000');

    // await dai.faucet(ADDRESS_2, amount);
    // await bat.faucet(ADDRESS_2, amount);
    // await rep.faucet(ADDRESS_2, amount);
    // await zrx.faucet(ADDRESS_2, amount);

    // await seedTokenBalance(dai, ADDRESS_1, amount);
    // await seedTokenBalance(bat, ADDRESS_1, amount);
    // await seedTokenBalance(rep, ADDRESS_1, amount);
    // await seedTokenBalance(zrx, ADDRESS_1, amount);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
