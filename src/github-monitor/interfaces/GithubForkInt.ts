import { GithubRepoInt } from "./GithubRepoInt";
import { GithubUserInt } from "./GithubUserInt";

export interface GithubForkInt {
  forkee: GithubRepoInt;
  repository: GithubRepoInt;
  sender: GithubUserInt;
}
