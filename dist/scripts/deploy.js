"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hardhat_1 = require("hardhat");
async function main() {
    const [deployer] = await hardhat_1.ethers.getSigners();
    console.log("Deploying contract with address:", deployer.address);
    const GameFactory = await hardhat_1.ethers.getContractFactory("GuessGame");
    const game = await GameFactory.deploy();
    await game.waitForDeployment();
    const gameAddress = await game.getAddress();
    console.log("GuessGame deployed to:", gameAddress);
}
main().catch((error) => {
    console.error("❌ Deployment failed:", error);
    process.exitCode = 1;
});
