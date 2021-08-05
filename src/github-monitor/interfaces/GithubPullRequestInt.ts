import { GithubUserInt } from "./GithubUserInt";

export interface GithubPullRequestInt {
  html_url: string;
  body: string;
  number: number;
  merged: boolean;
  title: string;
  user: GithubUserInt;
}
