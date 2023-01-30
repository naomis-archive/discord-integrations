import fetch from "node-fetch";

import { GlobalConfigInt } from "../../../interfaces/GlobalConfigInt";
import { errorHandler } from "../../../utils/errorHandler";
import { ParsedTweetInt } from "../../interfaces/ParsedTweetInt";

/**
 * Takes parsed tweet data and posts it to a Discord webhook.
 *
 * @param {GlobalConfigInt} CONFIG - The global config object.
 * @param {ParsedTweetInt} tweet - The parsed tweet object to send.
 */
export const sendTweet = async (
  CONFIG: GlobalConfigInt,
  tweet: ParsedTweetInt
): Promise<void> => {
  try {
    await fetch(CONFIG.twitterDiscordWebhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: `Hey there <@&${CONFIG.twitterNotificationRoleId}>, Naomi did a tweet!`,
        embeds: [
          {
            title: "Naomi " + tweet.title,
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
              // eslint-disable-next-line camelcase
              icon_url: tweet.avatar,
              url: tweet.profile,
            },
            image: tweet.images.map((url) => {
              url;
            }),
          },
        ],
      }),
    });
  } catch (err) {
    errorHandler(CONFIG, "tweet sender", err);
  }
};
