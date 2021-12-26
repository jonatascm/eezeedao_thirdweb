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
    const amount = 420_000;
    await voteModule.propose(
      "Should the DAO mint an additional " +
        amount +
        " tokens into the treasury?",
      [
        {
          nativeTokenValue: 0,
          transactionData: tokenModule.contract.interface.encodeFunctionData(
            "mint",
            [voteModule.address, ethers.utils.parseUnits(amount.toString(), 18)]
          ),
          toAddress: tokenModule.address,
        },
      ]
    );

    console.log("Successfully created proposal to mint tokens");
  } catch (error) {
    console.error("failed to create first proposal", error);
    process.exit(1);
  }

  try {
    const amount = 6_900;
    await voteModule.propose(
      "Should the EezeeDAO transfer " +
        amount +
        " tokens from the treasury to " +
        process.env.WALLET_ADDRESS +
        " for deploying all the project",
      [
        {
          nativeTokenValue: 0,
          transactionData: tokenModule.contract.interface.encodeFunctionData(
            "transfer",
            [
              process.env.WALLET_ADDRESS,
              ethers.utils.parseUnits(amount.toString(), 18),
            ]
          ),

          toAddress: tokenModule.address,
        },
      ]
    );

    console.log(
      "Successfully created proposal to reward ourselves from the treasury, let's hope people vote for it!"
    );
  } catch (error) {
    console.error("failed to create second proposal", error);
  }
})();
