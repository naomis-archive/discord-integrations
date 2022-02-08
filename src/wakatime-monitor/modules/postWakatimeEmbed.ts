import fetch from "node-fetch";

import { DiscordEmbedInt } from "../../interfaces/DiscordEmbedInt";
import { GlobalConfigInt } from "../../interfaces/GlobalConfigInt";
import { errorHandler } from "../../utils/errorHandler";

/**
 * Sends a Discord embed to the Wakatime Webhook.
 *
 * @param {GlobalConfigInt} CONFIG The global config object.
 * @param {DiscordEmbedInt} embed The Discord embed to send.
 */
export const postWakatimeEmbed = async (
  CONFIG: GlobalConfigInt,
  embed: DiscordEmbedInt
): Promise<void> => {
  try {
    await fetch(CONFIG.wakatimeDiscordWebhook, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: `<@&${CONFIG.wakatimeNotificationRoleId}>, here is Naomi's latest coding stats update.`,
        embeds: [embed],
      }),
    });
  } catch (err) {
    errorHandler(CONFIG, "post embed", err);
  }
};
