import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

import dotenv from "dotenv";
dotenv.config();

if (!process.env.ERC1155_ADDRESS || process.env.ERC1155_ADDRESS === "") {
  console.log("NFT Membership Address not found.");
}

const bundleDrop = sdk.getBundleDropModule(process.env.ERC1155_ADDRESS);

(async () => {
  try {
    await bundleDrop.createBatch([
      {
        name: "Eezee DAO Membership",
        description: "This NFT will give you access to EezeeDAO!",
        image: readFileSync("scripts/assets/membership.jpeg"),
      },
    ]);
    console.log("Successfully created a new NFT in the drop!");
  } catch (error) {
    console.error("failed to create the new NFT", error);
  }
})();
