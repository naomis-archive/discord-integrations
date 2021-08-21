import { GithubRepoInt } from "./GithubRepoInt";
import { GithubUserInt } from "./GithubUserInt";

/**
 * The structure of the fork data from the GitHub Webhook.
 */
export interface GithubForkInt {
  forkee: GithubRepoInt;
  repository: GithubRepoInt;
  sender: GithubUserInt;
}
