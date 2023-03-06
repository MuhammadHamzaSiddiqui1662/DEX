import { ethers } from "hardhat";
import { ADDRESS_1, ADDRESS_2, BAT, DEX_ADDRESS, REP } from "../constants";
import { formatBytes32String } from "@ethersproject/strings";

const SIDE = {
    BUY: 0,
    SELL: 1,
};

async function main() {
    const args: any[] = [];
    const accounts = await ethers.getSigners();
    const deployer = accounts[0];

    const Dex = await ethers.getContractFactory("Dex");
    const dex = await Dex.attach(DEX_ADDRESS);

    const increaseTime = async (seconds: number) => {
        await ethers.provider.send('evm_increaseTime', [seconds]);
        await ethers.provider.send('evm_mine', []);
    }

    await dex.createLimitOrder(BAT, 1000, 10, SIDE.BUY, { from: ADDRESS_1 });
    await dex.createMarketOrder(BAT, 1000, SIDE.SELL, { from: ADDRESS_1 });
    // await increaseTime(1);
    await dex.createLimitOrder(BAT, 1200, 11, SIDE.BUY, { from: ADDRESS_1 });
    await dex.createMarketOrder(BAT, 1200, SIDE.SELL, { from: ADDRESS_1 });
    // await increaseTime(1);
    await dex.createLimitOrder(BAT, 1200, 15, SIDE.BUY, { from: ADDRESS_1 });
    await dex.createMarketOrder(BAT, 1200, SIDE.SELL, { from: ADDRESS_1 });
    // await increaseTime(1);
    await dex.createLimitOrder(BAT, 1500, 14, SIDE.BUY, { from: ADDRESS_1 });
    await dex.createMarketOrder(BAT, 1500, SIDE.SELL, { from: ADDRESS_1 });
    // await increaseTime(1);
    await dex.createLimitOrder(BAT, 2000, 12, SIDE.BUY, { from: ADDRESS_1 });
    await dex.createMarketOrder(BAT, 2000, SIDE.SELL, { from: ADDRESS_1 });
    // await increaseTime(1);
    await dex.createLimitOrder(REP, 1000, 2, SIDE.BUY, { from: ADDRESS_1 });
    await dex.createMarketOrder(REP, 1000, SIDE.SELL, { from: ADDRESS_1 });
    // await increaseTime(1);
    await dex.createLimitOrder(REP, 500, 4, SIDE.BUY, { from: ADDRESS_1 });
    await dex.createMarketOrder(REP, 500, SIDE.SELL, { from: ADDRESS_1 });
    // await increaseTime(1);
    await dex.createLimitOrder(REP, 800, 2, SIDE.BUY, { from: ADDRESS_1 });
    await dex.createMarketOrder(REP, 800, SIDE.SELL, { from: ADDRESS_1 });
    // await increaseTime(1);
    await dex.createLimitOrder(REP, 1200, 6, SIDE.BUY, { from: ADDRESS_1 });
    await dex.createMarketOrder(REP, 1200, SIDE.SELL, { from: ADDRESS_1 });
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
