import { GlobalConfigInt } from "../../interfaces/GlobalConfigInt";
import { errorHandler } from "../../utils/errorHandler";
import {
  ContributorMessage,
  FirstTimerMessage,
} from "../config/ReplyTemplates";
import { GithubPullInt } from "../interfaces/GithubPullInt";

/**
 * Posts a thanks message on closed + merged PRs.
 *
 * @param {GlobalConfigInt} CONFIG The config data.
 * @param {GithubPullInt} data The pull request data.
 * @param {boolean} firstTimer Whether the PR was a first-timer PR or not.
 */
export const sendCloseMessage = async (
  CONFIG: GlobalConfigInt,
  data: GithubPullInt,
  firstTimer: boolean
) => {
  try {
    const owner = data.repository.owner.login;
    const repo = data.repository.name;
    const number = data.number;

    await fetch(
      `https://api.github.com/repos/${owner}/${repo}/issues/${number}/comments`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${CONFIG.githubToken}`,
          "Content-Type": "application/json",
          Accept: "application/vnd.github.v3+json",
        },
        body: JSON.stringify({
          body: firstTimer ? FirstTimerMessage : ContributorMessage,
        }),
      }
    );
  } catch (err) {
    errorHandler(CONFIG, "send close message", err);
  }
};
