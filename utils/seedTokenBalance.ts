import { ethers } from "hardhat";
import { formatBytes32String } from "@ethersproject/strings";
import { Bat, Dai, Rep, Zrx } from "../typechain-types";
import { DEX_ADDRESS } from "../constants";
import { BigNumber } from "ethers";

export const seedTokenBalance = async (token: Dai | Bat | Rep | Zrx, trader: string, amount: BigNumber) => {
    const Dex = await ethers.getContractFactory("Dex");
    const dex = await Dex.attach(DEX_ADDRESS);
    const tokenName = await token.name();
    console.log(`Transfering ${tokenName}...`);
    await token.faucet(trader, amount);
    console.log(`Faucets claimed successfully.`);
    console.log(`Approving for dex...`);
    await token.approve(dex.address, amount, { from: trader });
    console.log(`Approved Successfully.`);
    console.log(`Depositing...`);
    await dex.deposit(amount, formatBytes32String(tokenName), { from: trader });
    console.log(`${tokenName} transfered succussfully`);
};