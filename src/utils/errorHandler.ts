import * as Sentry from "@sentry/node";
import { GlobalConfigInt } from "../interfaces/GlobalConfigInt";
import { logHandler } from "./logHandler";
import { postErrorMessage } from "./postErrorMessage";
export const errorHandler = (
  CONFIG: GlobalConfigInt,
  context: string,
  error: Error
): void => {
  logHandler.log("error", `There was an error in the ${context}:`);
  logHandler.log(
    "error",
    JSON.stringify({ errorMessage: error.message, errorStack: error.stack })
  );
  Sentry.captureException(error);
  postErrorMessage(CONFIG, context, error.message, error.stack || "null");
};
