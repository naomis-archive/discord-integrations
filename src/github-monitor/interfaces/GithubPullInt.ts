import { GithubPullRequestInt } from "./GithubPullRequestInt";
import { GithubRepoInt } from "./GithubRepoInt";
import { GithubUserInt } from "./GithubUserInt";

export interface GithubPullInt {
  action: string;
  number: number;
  pull_request: GithubPullRequestInt;
  repository: GithubRepoInt;
  sender: GithubUserInt;
}
