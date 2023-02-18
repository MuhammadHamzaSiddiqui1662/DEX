import { verify, verifyMocks } from "../utils/verify";
import { ethers } from "hardhat";

async function main() {
  const args: any[] = [];
  const accounts = await ethers.getSigners();
  const deployer = accounts[0];
  //
  const Dex = await ethers.getContractFactory("Dex");
  const dex = await Dex.deploy(...args);
  await dex.deployed();
  console.log(`DEX Contract Deployed at address: ${dex.address} by signer: ${deployer.address}`);
  //
  const Dai = await ethers.getContractFactory("Dai");
  const dai = await Dai.deploy(...args);
  await dai.deployed();
  console.log(`DAI Contract Deployed at address: ${dai.address} by signer: ${deployer.address}`);
  //
  const Bat = await ethers.getContractFactory("Bat");
  const bat = await Bat.deploy(...args);
  await bat.deployed();
  console.log(`BAT Contract Deployed at address: ${bat.address} by signer: ${deployer.address}`);
  //
  const Rep = await ethers.getContractFactory("Rep");
  const rep = await Rep.deploy(...args);
  await rep.deployed();
  console.log(`REP Contract Deployed at address: ${rep.address} by signer: ${deployer.address}`);
  //
  const Zrx = await ethers.getContractFactory("Zrx");
  const zrx = await Zrx.deploy(...args);
  await zrx.deployed();
  console.log(`ZRX Contract Deployed at address: ${zrx.address} by signer: ${deployer.address}`);
  //
  if (process.env.ETHERSCAN_API_KEY) {
    console.log("Verifying Contract...");
    await verify(dex.address, args);
    await verifyMocks("contracts/mocks/Dai.sol:Dai", dai.address, args);
    await verifyMocks("contracts/mocks/Bat.sol:Bat", bat.address, args);
    await verifyMocks("contracts/mocks/Rep.sol:Rep", rep.address, args);
    await verifyMocks("contracts/mocks/Zrx.sol:Zrx", zrx.address, args);
    console.log("Verified!");
  }
}
//
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
