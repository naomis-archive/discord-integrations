import { GithubUserInt } from "./GithubUserInt";

export interface GithubIssueInt {
  id: number;
  node_id: string;
  url: string;
  repository_url: string;
  html_url: string;
  number: number;
  state: string;
  title: string;
  body: string;
  user: GithubUserInt;
  created_at: string;
  updated_at: string;
  closed_by: GithubUserInt;
}
