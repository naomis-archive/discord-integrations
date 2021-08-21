import { IncomingHttpHeaders } from "http";

/**
 * This is a custom extension of the standard headers
 * interface to allow for the github event header.
 */
export interface GithubHeadersInt extends IncomingHttpHeaders {
  "x-github-event": string;
}
