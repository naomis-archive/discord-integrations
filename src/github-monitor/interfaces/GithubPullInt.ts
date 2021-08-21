import { GithubPullRequestInt } from "./GithubPullRequestInt";
import { GithubRepoInt } from "./GithubRepoInt";
import { GithubUserInt } from "./GithubUserInt";

/**
 * Structure of the pull request data from the GitHub Webhook.
 */
export interface GithubPullInt {
  action: string;
  number: number;
  pull_request: GithubPullRequestInt;
  repository: GithubRepoInt;
  sender: GithubUserInt;
}
