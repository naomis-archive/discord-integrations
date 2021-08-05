import fetch from "node-fetch";
import { DiscordEmbedInt } from "../../interfaces/DiscordEmbedInt";
import { GlobalConfigInt } from "../../interfaces/GlobalConfigInt";
import { errorHandler } from "../../utils/errorHandler";

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
        content: `<@&${CONFIG.wakatimeNotificationRoleId}>, here is <@!${CONFIG.ownerId}>'s latest coding stats update.`,
        embeds: [embed],
      }),
    });
  } catch (err) {
    errorHandler(CONFIG, "post embed", err);
  }
};
