import { GlobalConfigInt } from "../interfaces/GlobalConfigInt";
import { logHandler } from "../utils/logHandler";

import { monitorTweets } from "./modules/monitorTweets";

/**
 * Module to load the twitter wrapper and schedule it on an interval.
 *
 * @param {GlobalConfigInt} CONFIG The global config object.
 */
export const twitterMonitor = async (
  CONFIG: GlobalConfigInt
): Promise<void> => {
  logHandler.log("debug", "Starting first Twitter monitor run...");
  await monitorTweets(CONFIG);

  logHandler.log("debug", "Setting Twitter monitor on interval of 2 minutes.");
  setInterval(async () => await monitorTweets(CONFIG), 120000);
};
