import { GithubRepoInt } from "./GithubRepoInt";
import { GithubUserInt } from "./GithubUserInt";

export interface GithubStarInt {
  action: "created" | "deleted";
  starred_at: string;
  repository: GithubRepoInt;
  sender: GithubUserInt;
}
