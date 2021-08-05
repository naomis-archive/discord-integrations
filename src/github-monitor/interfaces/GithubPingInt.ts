import { GithubRepoInt } from "./GithubRepoInt";
import { GithubUserInt } from "./GithubUserInt";

export interface GithubPingInt {
  zen: string;
  hook_id: string;
  hook: Record<string, unknown>;
  repository: GithubRepoInt;
  organization: Record<string, unknown>;
  sender: GithubUserInt;
}
