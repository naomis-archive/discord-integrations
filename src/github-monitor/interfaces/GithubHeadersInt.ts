import { IncomingHttpHeaders } from "http";

export interface GithubHeadersInt extends IncomingHttpHeaders {
  "x-github-event": string;
}
