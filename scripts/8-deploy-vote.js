import sdk from "./1-initialize-sdk.js";

import dotenv from "dotenv";
dotenv.config();

if (!process.env.DAO_ADDRESS || process.env.DAO_ADDRESS === "") {
  console.log("DAO Address not found.");
}

if (
  !process.env.ERC20_GOVERNANCE_ADDRESS ||
  process.env.ERC20_GOVERNANCE_ADDRESS === ""
) {
  console.log("ERC20 Governance Address not found.");
}

const appModule = sdk.getAppModule(process.env.DAO_ADDRESS);

(async () => {
  try {
    const voteModule = await appModule.deployVoteModule({
      name: "EezeeDAO Proposals Contract",
      votingTokenAddress: process.env.ERC20_GOVERNANCE_ADDRESS,
      proposalStartWaitTimeInSeconds: 0,
      proposalVotingTimeInSeconds: 24 * 60 * 60, //24-hours
      votingQuorumFraction: 0,
      minimumNumberOfTokensNeededToPropose: "0",
    });

    console.log(
      "Successfully deployed vote module, address:",
      voteModule.address
    );
  } catch (err) {
    console.log("Failed to deploy vote module", err);
  }
})();
