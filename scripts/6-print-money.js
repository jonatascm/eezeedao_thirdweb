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

const tokenModule = sdk.getTokenModule(process.env.ERC20_GOVERNANCE_ADDRESS);

(async () => {
  try {
    const amount = 1_000_000;
    const amountWith18Decimals = ethers.utils.parseUnits(amount.toString(), 18);
    await tokenModule.mint(amountWith18Decimals);
    const totalSupply = await tokenModule.totalSupply();
    console.log(
      "There now is",
      ethers.utils.formatUnits(totalSupply, 18),
      "$EEZEE in circulation"
    );
  } catch (error) {
    console.error("Failed to print money", error);
  }
})();
