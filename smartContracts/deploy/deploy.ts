import { deployContract, getWallet } from "./utils";
import { HardhatRuntimeEnvironment } from "hardhat/types";

export default async function (hre: HardhatRuntimeEnvironment) {
  const wallet = getWallet();
  
  const PuzzleSocial = await deployContract("PuzzleSocial", [], {
    hre,
    wallet,
    // value: hre.ethers.parseEther("0.1"), // Optional: Fund the contract with 0.1 ETH during deployment
    verify: true, // Verify the contract on the block explorer
  });



}
