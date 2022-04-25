import fetch from "node-fetch";

import { DiscordEmbedInt } from "../../../interfaces/DiscordEmbedInt";
import { GlobalConfigInt } from "../../../interfaces/GlobalConfigInt";
import { customSubstring } from "../../../utils/customSubstring";
import { errorHandler } from "../../../utils/errorHandler";
import { PostData } from "../../interfaces/PostData";

/**
 * Turns a tumblr post into a Discord embed and sends it.
 *
 * @param {GlobalConfigInt} CONFIG The global config object.
 * @param {PostData} post The tumblr post.
 */
export const sendPost = async (CONFIG: GlobalConfigInt, post: PostData) => {
  try {
    const embed: DiscordEmbedInt = {};
    embed.title = post.title || "Untitled Post";
    embed.description = customSubstring(
      post.body || post.caption || "No body",
      2000
    );
    embed.url = post.post_url;
    embed.footer = {
      text: post.tags?.length
        ? customSubstring(post.tags.map((el) => `#${el}`).join(", "), 2000)
        : "none",
    };

    if (post.photos?.length) {
      embed.image = {
        url: post.photos[0].original_size.url,
        height: post.photos[0].original_size.height,
        width: post.photos[0].original_size.width,
      };
    }

    await fetch(CONFIG.tumblrDiscordWebhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: `Hey there <@&${CONFIG.tumblrNotificationRoleId}>, Naomi made a Tumblr post!`,
        embeds: [embed],
      }),
    });
  } catch (err) {
    errorHandler(CONFIG, "send tumblr post", err);
  }
};
