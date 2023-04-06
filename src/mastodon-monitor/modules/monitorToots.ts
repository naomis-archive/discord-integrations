import { GlobalConfigInt } from "../../interfaces/GlobalConfigInt";
import { errorHandler } from "../../utils/errorHandler";
import { logHandler } from "../../utils/logHandler";
import { updateCache } from "../../utils/updateCache";

import { fetchToots } from "./toots/fetchToots";
import { parseToot } from "./toots/parseToots";
import { sendToot } from "./toots/sendToot";

/**
 * Wrapper to handle all of the Mastodon-Discord logic.
 *
 * @param {GlobalConfigInt} CONFIG - The environment CONFIGuration object.
 */
export const monitorToots = async (CONFIG: GlobalConfigInt): Promise<void> => {
  try {
    logHandler.log("debug", "Collecting toots");
    for (const value of [
      "naomi",
      "becca",
      "rosalia",
      "beccalia",
      "nhcarrigan",
    ]) {
      const user = value as
        | "naomi"
        | "becca"
        | "rosalia"
        | "beccalia"
        | "nhcarrigan";
      const data = await fetchToots(CONFIG, user);
      if (!data) {
        logHandler.log("error", "toots not collected.");
        return;
      }

      if (!data.length) {
        logHandler.log("debug", "No new toots yet.");
        return;
      }

      if (!CONFIG.lastMastodon[user]) {
        logHandler.log(
          "debug",
          "This appears to be the first run. No toots will be processed this time."
        );
        CONFIG.lastMastodon[user] = data[0].id;
        return;
      }

      for (const toot of data) {
        CONFIG.lastMastodon[user] = toot.id;

        logHandler.log("debug", `Processing toot with ID of ${toot.id}`);
        const parsed = parseToot(CONFIG, toot);

        if (!parsed) {
          logHandler.log("debug", `could not parse toot ${toot.id}`);
          continue;
        }

        updateCache(CONFIG, {
          title: `${user[0].toUpperCase() + user.slice(1)} was on Mastodon!`,
          description: parsed.content,
          timestamp: Date.now(),
        });

        logHandler.log("debug", `Sending toot ${toot.id}`);
        await sendToot(CONFIG, parsed, user);
      }
    }

    logHandler.log("debug", `Toot processing complete.`);
  } catch (err) {
    errorHandler(CONFIG, "toot monitor", err);
  }
};
