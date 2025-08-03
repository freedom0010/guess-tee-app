import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contract with address:", deployer.address);

  const GameFactory = await ethers.getContractFactory("GuessGame");
  const game = await GameFactory.deploy();
  await game.waitForDeployment();

  const gameAddress = await game.getAddress();
  console.log("GuessGame deployed to:", gameAddress);
}

main().catch((error) => {
  console.error("❌ Deployment failed:", error);
  process.exitCode = 1;
});
