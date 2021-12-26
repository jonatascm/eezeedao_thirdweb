import sdk from "./1-initialize-sdk.js";

import dotenv from "dotenv";
dotenv.config();

if (!process.env.DAO_ADDRESS || process.env.DAO_ADDRESS === "") {
  console.log("DAO Address not found.");
}

const app = sdk.getAppModule(process.env.DAO_ADDRESS);

(async () => {
  try {
    const tokenModule = await app.deployTokenModule({
      name: "EezeeDAO Governance Token",
      symbol: "EEZEE",
    });
    console.log(
      "Successfully deployed token module, address:",
      tokenModule.address
    );
  } catch (error) {
    console.error("failed to deploy token module", error);
  }
})();
