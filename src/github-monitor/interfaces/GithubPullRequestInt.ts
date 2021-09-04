import { GithubUserInt } from "./GithubUserInt";

/**
 * Structure of the nested pull request data from the
 * GitHub Webhook.
 */
export interface GithubPullRequestInt {
  // eslint-disable-next-line camelcase
  html_url: string;
  body: string;
  number: number;
  merged: boolean;
  title: string;
  user: GithubUserInt;
}
