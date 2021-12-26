import sdk from "./1-initialize-sdk.js";

import dotenv from "dotenv";
dotenv.config();

if (!process.env.ERC1155_ADDRESS || process.env.ERC1155_ADDRESS === "") {
  console.log("NFT Membership Address not found.");
}

const bundleDrop = sdk.getBundleDropModule(process.env.ERC1155_ADDRESS);

(async () => {
  try {
    const claimConditionFactory = bundleDrop.getClaimConditionFactory();
    claimConditionFactory.newClaimPhase({
      startTime: new Date(),
      maxQuantity: 1_000_000,
      maxQuantityPerTransaction: 1,
    });

    await bundleDrop.setClaimCondition(0, claimConditionFactory);
    console.log(
      "Sucessfully set claim condition on bundle drop:",
      bundleDrop.address
    );
  } catch (error) {
    console.error("Failed to set claim condition", error);
  }
})();
