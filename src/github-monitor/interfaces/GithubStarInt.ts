import { GithubRepoInt } from "./GithubRepoInt";
import { GithubUserInt } from "./GithubUserInt";

/**
 * Structure of the star data sent from the GitHub Webhook.
 */
export interface GithubStarInt {
  action: "created" | "deleted";
  starred_at: string;
  repository: GithubRepoInt;
  sender: GithubUserInt;
}
