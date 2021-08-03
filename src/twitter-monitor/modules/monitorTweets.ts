import { GlobalConfigInt } from "../../interfaces/GlobalConfigInt";
import { errorHandler } from "../../utils/errorHandler";
import { logHandler } from "../../utils/logHandler";
import { fetchTweets } from "./tweets/fetchTweets";
import { parseTweet } from "./tweets/parseTweets";
import { sendTweet } from "./tweets/sendTweets";

/**
 * Wrapper to handle all of the Twitter-Discord logic.
 * @param {ConfigInt} config - The environment configuration object.
 */
export const monitorTweets = async (config: GlobalConfigInt): Promise<void> => {
  try {
    logHandler.log("debug", "Collecting tweets");
    const data = await fetchTweets(config);

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

    if (!config.lastTweet) {
      logHandler.log(
        "debug",
        "This appears to be the first run. No tweets will be processed this time."
      );
      config.lastTweet = tweets[tweets.length - 1].id;
      return;
    }

    for (const tweet of tweets) {
      logHandler.log("debug", `Processing tweet with ID of ${tweet.id}`);
      const parsed = parseTweet(tweet, data.includes);

      if (!parsed) {
        logHandler.log("debug", `could not parse tweet ${tweet.id}`);
        continue;
      }

      logHandler.log("debug", `Sending tweet ${tweet.id}`);
      await sendTweet(config, parsed);

      config.lastTweet = tweet.id;
    }

    logHandler.log(
      "debug",
      `Tweet processing complete. Handled ${tweets.length} tweets.`
    );
  } catch (err) {
    errorHandler("tweet monitor", err);
  }
};
