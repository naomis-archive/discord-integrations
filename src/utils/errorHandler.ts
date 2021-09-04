/* eslint-disable jsdoc/no-undefined-types */
import * as Sentry from "@sentry/node";
import { GlobalConfigInt } from "../interfaces/GlobalConfigInt";
import { logHandler } from "./logHandler";
import { postErrorMessage } from "./postErrorMessage";

/**
 * Custom error handler to pass exceptions to Sentry and
 * post a notice to the Discord webhook.
 *
 * @param {GlobalConfigInt} CONFIG The global config object.
 * @param {string} context A description of where in the codebase the error occurred.
 * @param {unknown} err The error object.
 */
export const errorHandler = (
  CONFIG: GlobalConfigInt,
  context: string,
  err: unknown
): void => {
  const error = err as Error;
  logHandler.log("error", `There was an error in the ${context}:`);
  logHandler.log(
    "error",
    JSON.stringify({ errorMessage: error.message, errorStack: error.stack })
  );
  Sentry.captureException(error);
  postErrorMessage(CONFIG, context, error.message, error.stack || "null");
};
