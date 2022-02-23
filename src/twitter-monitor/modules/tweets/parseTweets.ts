import { GlobalConfigInt } from "../../../interfaces/GlobalConfigInt";
import { errorHandler } from "../../../utils/errorHandler";
import { ParsedTweetInt } from "../../interfaces/ParsedTweetInt";
import { TweetIncludesInt, TweetInt } from "../../interfaces/TweetListInt";

/**
 * This parses a tweet object into a new object.
 * Will modify the new object based on the type of
 * the tweet (ie quote tweet vs reply vs original).
 *
 * @param {GlobalConfigInt} CONFIG The global config object.
 * @param {TweetInt} tweet - A single tweet object received from the API.
 * @param {TweetIncludesInt} includes - The includes values from the API, containing user and referenced tweet data.
 * @returns {ParsedTweetInt} - A new object representing the tweet, or `null` on error.
 */
export const parseTweet = (
  CONFIG: GlobalConfigInt,
  tweet: TweetInt,
  includes: TweetIncludesInt
): ParsedTweetInt | null => {
  try {
    const author = includes.users.find((user) => user.id === tweet.author_id);

    let refTweet: TweetInt | null = null;
    if (tweet.referenced_tweets?.length) {
      refTweet =
        includes.tweets?.find(
          (inc) => inc.id === tweet.referenced_tweets?.[0].id
        ) || null;
    }
    const refType = refTweet ? tweet.referenced_tweets?.[0].type : null;
    const refAuthor = refTweet
      ? includes.users.find((user) => user.id === refTweet?.author_id)
      : null;

    let title = "Tweeted";

    const content =
      refType === "retweeted" && refTweet ? refTweet.text : tweet.text;

    let links = `[See my Tweet](https://twitter.com/${author?.username}/status/${tweet.id})`;

    switch (refType) {
      case "retweeted":
        title = "Retweeted";
        links += `\n[Retweeted from here](https://twitter.com/${refAuthor?.username}/status/${refTweet?.id})`;
        break;
      case "quoted":
        title = "Quoted";
        links += `\n[Quoted from here](https://twitter.com/${refAuthor?.username}/status/${refTweet?.id})`;
        break;
      case "replied_to":
        title = "Replied";
        links += `\n[Replying to this tweet](https://twitter.com/${refAuthor?.username}/status/${refTweet?.id})`;
        break;
    }

    return {
      title,
      content,
      links,
      username: author?.username || "no user found",
      avatar:
        author?.profile_image_url ||
        "https://cdn.nhcarrigan.com/content/profile.jpg",
      profile: `https://twitter.com/${author?.username || "nhcarrigan"}`,
    };
  } catch (err) {
    errorHandler(CONFIG, "tweet parser", err);
    return null;
  }
};
