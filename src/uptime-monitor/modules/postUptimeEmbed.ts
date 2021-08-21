import fetch from "node-fetch";
import { DiscordEmbedInt } from "../../interfaces/DiscordEmbedInt";
import { GlobalConfigInt } from "../../interfaces/GlobalConfigInt";
import { errorHandler } from "../../utils/errorHandler";

/**
 * This function posts a Discord embed to the Uptime webhook.
 *
 * @param {GlobalConfigInt} CONFIG The global config object.
 * @param {DiscordEmbedInt} embed The embed to post.
 */
export const postUptimeEmbed = async (
  CONFIG: GlobalConfigInt,
  embed: DiscordEmbedInt
): Promise<void> => {
  try {
    await fetch(CONFIG.uptimeDiscordWebhook, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: `<@&${CONFIG.uptimeNotificationRoleId}>, one of <@!${CONFIG.ownerId}>'s applications has changed status.`,
        embeds: [embed],
      }),
    });
  } catch (err) {
    errorHandler(CONFIG, "post embed", err);
  }
};
