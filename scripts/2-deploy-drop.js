import { ethers } from "ethers";
import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

import dotenv from "dotenv";
dotenv.config();

if (!process.env.DAO_ADDRESS || process.env.DAO_ADDRESS === "") {
  console.log("DAO Address not found.");
}

const app = sdk.getAppModule(process.env.DAO_ADDRESS);

(async () => {
  try {
    const bundleDropModule = await app.deployBundleDropModule({
      name: "EezeeDAO Membership",
      description: "A DAO for help anyone who wants to get into web3",
      image: readFileSync("scripts/assets/eezeeDAO.jpeg"),
      primarySaleRecipientAddress: ethers.constants.AddressZero,
    });

    console.log(
      "Successfully deployed bundleDrop module, address:",
      bundleDropModule.address
    );
    console.log("bundleDrop metadata:", await bundleDropModule.getMetadata());
  } catch (error) {
    console.log("failed to deploy bundleDrop module", error);
  }
})();
