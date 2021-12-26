import { ethers } from "ethers";
import sdk from "./1-initialize-sdk.js";

if (
  !process.env.ERC20_GOVERNANCE_ADDRESS ||
  process.env.ERC20_GOVERNANCE_ADDRESS === ""
) {
  console.log("ERC20 Governance Address not found.");
}

if (!process.env.GOVERNANCE_ADDRESS || process.env.GOVERNANCE_ADDRESS === "") {
  console.log("Governance Contract Address not found.");
}

const voteModule = sdk.getVoteModule(process.env.GOVERNANCE_ADDRESS);

const tokenModule = sdk.getTokenModule(process.env.ERC20_GOVERNANCE_ADDRESS);

(async () => {
  try {
    await tokenModule.grantRole("minter", voteModule.address);

    console.log(
      "Successfully gave vote module permissions to act on token module"
    );
  } catch (error) {
    console.error(
      "Failed to grant vote module permissions on token module",
      error
    );
    process.exit(1);
  }

  try {
    const ownedTokenBalance = await tokenModule.balanceOf(
      process.env.WALLET_ADDRESS
    );

    const ownedAmount = ethers.BigNumber.from(ownedTokenBalance.value);
    const percent50 = ownedAmount.div(100).mul(50);

    await tokenModule.transfer(voteModule.address, percent50);

    console.log("Successfully transferred tokens to vote module");
  } catch (err) {
    console.error("failed to transfer tokens to vote module", err);
  }
})();
