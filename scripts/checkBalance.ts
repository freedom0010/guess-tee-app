import { ethers as hardhatEthers } from "hardhat"; // 用于获取 signers 和 provider
import { ethers } from "ethers"; // 用于格式化 ether 等工具函数

async function main() {
  // 获取本地第一个 signer
  const [signer] = await hardhatEthers.getSigners();

  const address = await signer.getAddress();
  const balance = await hardhatEthers.provider.getBalance(address);

  console.log("Address:", address);
  console.log("Balance:", ethers.formatEther(balance), "ETH");
}

main().catch((error) => {
  console.error("Error:", error);
  process.exitCode = 1;
});
