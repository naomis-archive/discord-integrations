import { GlobalConfigInt } from "../interfaces/GlobalConfigInt";
import { logHandler } from "../utils/logHandler";

import { monitorToots } from "./modules/monitorToots";

/**
 * Module to load the twitter wrapper and schedule it on an interval.
 *
 * @param {GlobalConfigInt} CONFIG The global config object.
 */
export const mastodonMonitor = async (
  CONFIG: GlobalConfigInt
): Promise<void> => {
  logHandler.log("debug", "Starting first Mastodon monitor run...");
  await monitorToots(CONFIG);

  logHandler.log("debug", "Setting Mastodon monitor on interval of 2 minutes.");
  setInterval(async () => await monitorToots(CONFIG), 120000);
};
