import { GithubIssueInt } from "./GithubIssueInt";
import { GithubRepoInt } from "./GithubRepoInt";
import { GithubUserInt } from "./GithubUserInt";

export interface GithubIssuesInt {
  action: string;
  issue: GithubIssueInt;
  repository: GithubRepoInt;
  sender: GithubUserInt;
}
