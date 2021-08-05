import { GithubIssueInt } from "./GithubIssueInt";
import { GithubRepoInt } from "./GithubRepoInt";
import { GithubUserInt } from "./GithubUserInt";

export interface GithubCommentInt {
  action: string;
  issue: GithubIssueInt;
  comment: {
    html_url: string;
    body: string;
    user: GithubUserInt;
  };
  repository: GithubRepoInt;
  sender: GithubUserInt;
}
