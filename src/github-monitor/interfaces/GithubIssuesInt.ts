import { GithubIssueInt } from "./GithubIssueInt";
import { GithubRepoInt } from "./GithubRepoInt";
import { GithubUserInt } from "./GithubUserInt";

/**
 * The structure of the top level issue data from the GitHub webhook.
 */
export interface GithubIssuesInt {
  action: string;
  issue: GithubIssueInt;
  repository: GithubRepoInt;
  sender: GithubUserInt;
}
