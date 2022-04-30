import { GlobalConfigInt } from "../../interfaces/GlobalConfigInt";
import { errorHandler } from "../../utils/errorHandler";
import { logHandler } from "../../utils/logHandler";
import { updateCache } from "../../utils/updateCache";

import { fetchTweets } from "./tweets/fetchTweets";
import { parseTweet } from "./tweets/parseTweets";
import { sendTweet } from "./tweets/sendTweets";

/**
 * Wrapper to handle all of the Twitter-Discord logic.
 *
 * @param {GlobalConfigInt} CONFIG - The environment CONFIGuration object.
 */
export const monitorTweets = async (CONFIG: GlobalConfigInt): Promise<void> => {
  try {
    logHandler.log("debug", "Collecting tweets");
    const data = await fetchTweets(CONFIG);

    if (!data) {
      logHandler.log("error", "Tweets not collected.");
      return;
    }

    const tweets = data.data
      ? data.data.sort(
          (a, b) =>
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        )
      : [];

    if (tweets.length === 0) {
      logHandler.log("debug", "No new tweets yet.");
      return;
    }

    if (!CONFIG.lastTweet) {
      logHandler.log(
        "debug",
        "This appears to be the first run. No tweets will be processed this time."
      );
      CONFIG.lastTweet = tweets[tweets.length - 1].id;
      return;
    }

    for (const tweet of tweets) {
      CONFIG.lastTweet = tweet.id;

      logHandler.log("debug", `Processing tweet with ID of ${tweet.id}`);
      const parsed = parseTweet(CONFIG, tweet, data.includes);

      if (!parsed) {
        logHandler.log("debug", `could not parse tweet ${tweet.id}`);
        continue;
      }

      updateCache(CONFIG, {
        title: "Naomi was on Twitter!",
        description: parsed.content,
        timestamp: Date.now(),
      });

      logHandler.log("debug", `Sending tweet ${tweet.id}`);
      await sendTweet(CONFIG, parsed);
    }

    logHandler.log(
      "debug",
      `Tweet processing complete. Handled ${tweets.length} tweets.`
    );
  } catch (err) {
    errorHandler(CONFIG, "tweet monitor", err);
  }
};
