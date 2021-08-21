import { TweetListInt } from "../../interfaces/TweetListInt";
import { errorHandler } from "../../../utils/errorHandler";
import fetch from "node-fetch";
import { GlobalConfigInt } from "../../../interfaces/GlobalConfigInt";

/**
 * Fetches tweets from the twitter API.
 * Will set the necessary fields for the data
 * handling, and will limit tweets based on latest
 * seen tweet (with a max of 100).
 *
 * @param {GlobalConfigInt} CONFIG The global config object.
 * @returns {TweetListInt} An array of tweet data.
 */
export const fetchTweets = async (
  CONFIG: GlobalConfigInt
): Promise<TweetListInt | null> => {
  try {
    const req = new URL(
      `https://api.twitter.com/2/users/${CONFIG.twitterId}/tweets`
    );

    req.searchParams.set("max_results", "100");
    req.searchParams.set(
      "tweet.fields",
      ["referenced_tweets", "text", "created_at", "id", "author_id"].join(",")
    );
    req.searchParams.set(
      "user.fields",
      ["username", "profile_image_url"].join(",")
    );
    req.searchParams.set(
      "expansions",
      [
        "author_id",
        "referenced_tweets.id",
        "referenced_tweets.id.author_id",
      ].join(",")
    );
    if (CONFIG.lastTweet) {
      req.searchParams.set("since_id", CONFIG.lastTweet);
    }

    const raw = await fetch(req.toString(), {
      headers: {
        Authorization: `Bearer ${CONFIG.twitterToken}`,
      },
    });

    const data = await raw.json();
    return data;
  } catch (err) {
    errorHandler(CONFIG, "fetch tweets module", err);
    return null;
  }
};
