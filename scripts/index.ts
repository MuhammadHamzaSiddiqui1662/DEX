import { ethers } from "hardhat";
import { ADDRESS_1, ADDRESS_2, ADDRESS_3, ADDRESS_4, BAT, DEX_ADDRESS, REP, ZRX } from "../constants";
import { formatBytes32String } from "@ethersproject/strings";
import { verify } from "../utils/verify";
import { BAT_ADDRESS, DAI_ADDRESS, REP_ADDRESS, ZRX_ADDRESS } from "../constants";

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

    // const Dai = await ethers.getContractFactory("Dai");
    // const dai = await Dai.attach(DAI_ADDRESS);
    // const Bat = await ethers.getContractFactory("Bat");
    // const bat = await Bat.attach(BAT_ADDRESS);
    // const Rep = await ethers.getContractFactory("Rep");
    // const rep = await Rep.attach(REP_ADDRESS);
    // const Zrx = await ethers.getContractFactory("Zrx");
    // const zrx = await Zrx.attach(ZRX_ADDRESS);

    // const amount = ethers.utils.parseEther('100');

    // console.log(`Transfering ${"DAI"}...`);
    // await dai.faucet(ADDRESS_1, amount);
    // console.log(`Faucets claimed successfully.`);
    // console.log(`Approving for dex...`);
    // await dai.approve(dex.address, amount, { from: ADDRESS_1 });
    // console.log(`Approved Successfully.`);
    // console.log(`Depositing...`);
    // await dex.deposit(amount, formatBytes32String("DAI"), { from: ADDRESS_1 });
    // console.log(`${"DAI"} transfered succussfully`);

    // console.log(`Transfering ${"BAT"}...`);
    // await bat.faucet(ADDRESS_1, amount);
    // console.log(`Faucets claimed successfully.`);
    // console.log(`Approving for dex...`);
    // await bat.approve(dex.address, amount, { from: ADDRESS_1 });
    // console.log(`Approved Successfully.`);
    // console.log(`Depositing...`);
    // await dex.deposit(amount, formatBytes32String("BAT"), { from: ADDRESS_1 });
    // console.log(`${"BAT"} transfered succussfully`);

    // console.log(`Transfering ${"ZRX"}...`);
    // await zrx.faucet(ADDRESS_1, amount);
    // console.log(`Faucets claimed successfully.`);
    // console.log(`Approving for dex...`);
    // await zrx.approve(dex.address, amount, { from: ADDRESS_1 });
    // console.log(`Approved Successfully.`);
    // console.log(`Depositing...`);
    // await dex.deposit(amount, formatBytes32String("ZRX"), { from: ADDRESS_1 });
    // console.log(`${"ZRX"} transfered succussfully`);



    // await dex.createLimitOrder(BAT, 1000, 10, SIDE.BUY, { from: ADDRESS_1 });
    // await dex.createLimitOrder(BAT, 1200, 11, SIDE.BUY, { from: ADDRESS_1 });
    // await dex.createLimitOrder(BAT, 1200, 15, SIDE.BUY, { from: ADDRESS_1 });
    // await dex.createLimitOrder(BAT, 1500, 14, SIDE.BUY, { from: ADDRESS_1 });
    // await dex.createLimitOrder(BAT, 2000, 12, SIDE.BUY, { from: ADDRESS_1 });
    // await dex.createLimitOrder(REP, 1000, 2, SIDE.BUY, { from: ADDRESS_1 });
    // await dex.createLimitOrder(REP, 500, 4, SIDE.BUY, { from: ADDRESS_1 });
    // await dex.createLimitOrder(REP, 800, 2, SIDE.BUY, { from: ADDRESS_1 });
    // await dex.createLimitOrder(REP, 1200, 6, SIDE.BUY, { from: ADDRESS_1 });
    // await dex.createLimitOrder(BAT, 1400, 10, SIDE.BUY, { from: ADDRESS_1 });
    // await dex.createLimitOrder(REP, 3000, 4, SIDE.BUY, { from: ADDRESS_1 });
    // await dex.createLimitOrder(REP, 2000, 5, SIDE.BUY, { from: ADDRESS_1 });
    // await dex.createLimitOrder(ZRX, 4000, 12, SIDE.BUY, { from: ADDRESS_1 });
    // await dex.createLimitOrder(ZRX, 3000, 13, SIDE.BUY, { from: ADDRESS_1 });

    // await dex.createMarketOrder(BAT, 1000, SIDE.SELL, { from: ADDRESS_2 });
    // await dex.createMarketOrder(BAT, 1200, SIDE.SELL, { from: ADDRESS_2 });
    // await dex.createMarketOrder(BAT, 1200, SIDE.SELL, { from: ADDRESS_2 });
    // await dex.createMarketOrder(BAT, 1500, SIDE.SELL, { from: ADDRESS_2 });
    // await dex.createMarketOrder(BAT, 2000, SIDE.SELL, { from: ADDRESS_2 });
    // await dex.createMarketOrder(REP, 1000, SIDE.SELL, { from: ADDRESS_2 });
    // await dex.createMarketOrder(REP, 500, SIDE.SELL, { from: ADDRESS_2 });
    // await dex.createMarketOrder(REP, 800, SIDE.SELL, { from: ADDRESS_2 });
    // await dex.createMarketOrder(REP, 1200, SIDE.SELL, { from: ADDRESS_2 });
    // await dex.createLimitOrder(BAT, 1200, 11, SIDE.BUY, { from: ADDRESS_2 });
    // await dex.createLimitOrder(BAT, 1000, 12, SIDE.BUY, { from: ADDRESS_2 });
    // await dex.createLimitOrder(REP, 500, 6, SIDE.BUY, { from: ADDRESS_2 });
    // await dex.createLimitOrder(ZRX, 500, 14, SIDE.BUY, { from: ADDRESS_2 });
    // await dex.createLimitOrder(ZRX, 1200, 22, SIDE.SELL, { from: ADDRESS_2 });

    // await dex.createLimitOrder(BAT, 2000, 16, SIDE.SELL, { from: ADDRESS_3 });
    // await dex.createLimitOrder(REP, 4000, 10, SIDE.SELL, { from: ADDRESS_3 });
    // await dex.createLimitOrder(REP, 2000, 9, SIDE.SELL, { from: ADDRESS_3 });
    // await dex.createLimitOrder(ZRX, 1500, 23, SIDE.SELL, { from: ADDRESS_3 });

    // await dex.createLimitOrder(BAT, 3000, 15, SIDE.SELL, { from: ADDRESS_4 });
    // await dex.createLimitOrder(BAT, 500, 14, SIDE.SELL, { from: ADDRESS_4 });
    // await dex.createLimitOrder(REP, 800, 8, SIDE.SELL, { from: ADDRESS_4 });
    // await dex.createLimitOrder(ZRX, 900, 21, SIDE.SELL, { from: ADDRESS_4 });



    // await dex.deposit(ethers.utils.parseEther("100"), formatBytes32String("Dai"), { from: ADDRESS_1 });

    // const dex = await Dex.deploy(...args);
    // await dex.deployed();
    // console.log(`DEX Contract Deployed at address: ${dex.address} by signer: ${deployer.address}`);
    // if (process.env.ETHERSCAN_API_KEY) {
    //     console.log("Verifying Contract...");
    //     await verify(dex.address, args);
    //     console.log("Verified!");
    // }


    // const amount = ethers.utils.parseEther('5000');
    // await dex.deposit(amount, formatBytes32String("BAT"), { from: ADDRESS_1 });

    const tokens = await dex.getTokens();
    console.log("Token List: ", tokens);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
