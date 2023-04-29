import { GithubRepoInt } from "./GithubRepoInt";
import { GithubUserInt } from "./GithubUserInt";

/**
 * The structure of the ping payload when a new GitHub webhook
 * is initialised.
 */
export interface GithubPingInt {
  zen: string;
  hook_id: string;
  hook: Record<string, unknown>;
  repository: GithubRepoInt;
  organization: Record<string, unknown>;
  sender: GithubUserInt;
}
