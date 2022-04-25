import { GlobalConfigInt } from "../interfaces/GlobalConfigInt";
import { logHandler } from "../utils/logHandler";

import { monitorPosts } from "./modules/monitorPosts";

/**
 * Module to load the tumblr wrapper and schedule it on an interval.
 *
 * @param {GlobalConfigInt} CONFIG The global config object.
 */
export const tumblrMonitor = async (CONFIG: GlobalConfigInt): Promise<void> => {
  logHandler.log("debug", "Starting first Twitter monitor run...");
  await monitorPosts(CONFIG);

  logHandler.log("debug", "Setting Twitter monitor on interval of 2 minutes.");
  setInterval(async () => await monitorPosts(CONFIG), 120000);
};
