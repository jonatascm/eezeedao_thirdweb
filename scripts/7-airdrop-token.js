import { ethers } from "ethers";
import sdk from "./1-initialize-sdk.js";
import dotenv from "dotenv";
dotenv.config();

if (
  !process.env.ERC20_GOVERNANCE_ADDRESS ||
  process.env.ERC20_GOVERNANCE_ADDRESS === ""
) {
  console.log("ERC20 Governance Address not found.");
}

if (!process.env.ERC1155_ADDRESS || process.env.ERC1155_ADDRESS === "") {
  console.log("NFT Membership Address not found.");
}

const bundleDropModule = sdk.getBundleDropModule(process.env.ERC1155_ADDRESS);

const tokenModule = sdk.getTokenModule(process.env.ERC20_GOVERNANCE_ADDRESS);

(async () => {
  try {
    const walletAddresses = await bundleDropModule.getAllClaimerAddresses("0");

    if (walletAddresses.length === 0) {
      console.log(
        "No NFTs have been claimed yet, maybe get some friends to claim your free NFTs!"
      );
      process.exit(0);
    }

    const airdropTargets = walletAddresses.map((address) => {
      const randomAmount = Math.floor(
        Math.random() * (10000 - 1000 + 1) + 1000
      );
      console.log("Going to airdrop", randomAmount, "tokens to", address);

      const airdropTarget = {
        address,
        amount: ethers.utils.parseUnits(randomAmount.toString(), 18),
      };

      return airdropTarget;
    });

    console.log("Starting airdrop...");
    await tokenModule.transferBatch(airdropTargets);
    console.log(
      "Successfully airdropped tokens to all the holders of the NFT!"
    );
  } catch (err) {
    console.error("Failed to airdrop tokens", err);
  }
})();
