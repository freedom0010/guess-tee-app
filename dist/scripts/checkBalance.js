"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hardhat_1 = require("hardhat"); // 用于获取 signers 和 provider
const ethers_1 = require("ethers"); // 用于格式化 ether 等工具函数
async function main() {
    // 获取本地第一个 signer
    const [signer] = await hardhat_1.ethers.getSigners();
    const address = await signer.getAddress();
    const balance = await hardhat_1.ethers.provider.getBalance(address);
    console.log("Address:", address);
    console.log("Balance:", ethers_1.ethers.formatEther(balance), "ETH");
}
main().catch((error) => {
    console.error("Error:", error);
    process.exitCode = 1;
});
