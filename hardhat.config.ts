import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@oasisprotocol/sapphire-hardhat";
import * as dotenv from "dotenv";
import "hardhat-sourcify";

dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    sapphireTest: {
      url: "https://testnet.sapphire.oasis.dev",
      chainId: 23295,
      accounts: [process.env.PRIVATE_KEY!],
    },
  },
};

export default config;
