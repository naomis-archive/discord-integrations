import { ParsedTweetInt } from "../../interfaces/ParsedTweetInt";
import { errorHandler } from "../../../utils/errorHandler";
import fetch from "node-fetch";
import { GlobalConfigInt } from "../../../interfaces/GlobalConfigInt";

/**
 * Takes parsed tweet data and posts it to a Discord webhook.
 * @param {ConfigInt} config - The environment configuration object.
 * @param {ParsedTweetInt} parsedTweet - The parsed tweet object to send.
 */
export const sendTweet = async (
  config: GlobalConfigInt,
  tweet: ParsedTweetInt
): Promise<void> => {
  try {
    await fetch(config.twitterDiscordWebhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: `Hey there <@&${config.twitterNotificationRoleId}>, nhcarrigan did a tweet!`,
        embeds: [
          {
            title: "nhcarrigan " + tweet.title,
            description: tweet.content,
            fields: [
              {
                name: "Links",
                value: tweet.links,
              },
            ],
            color: 0x3a3240,
            author: {
              name: tweet.username,
              icon_url: tweet.avatar,
              url: tweet.profile,
            },
          },
        ],
      }),
    });
  } catch (err) {
    errorHandler("tweet sender", err);
  }
};
