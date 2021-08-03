import { GlobalConfigInt } from "../interfaces/GlobalConfigInt";
import { logHandler } from "../utils/logHandler";
import { monitorTweets } from "./modules/monitorTweets";
import { testTwitterWebhook } from "./modules/testTwitterWebhook";

export const twitterMonitor = async (
  CONFIG: GlobalConfigInt
): Promise<void> => {
  logHandler.log("debug", "Verifying Twitter webhook.");

  const webhookValid = await testTwitterWebhook(CONFIG);

  if (!webhookValid) {
    logHandler.log("error", "Twitter webhook is not valid.");
    return;
  }

  logHandler.log("debug", "Starting first Twitter monitor run...");
  await monitorTweets(CONFIG);

  logHandler.log("debug", "Setting Twitter monitor on interval of 2 minutes.");
  setInterval(async () => await monitorTweets(CONFIG), 120000);
};
