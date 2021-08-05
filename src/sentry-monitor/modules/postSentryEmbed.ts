import fetch from "node-fetch";
import { DiscordEmbedInt } from "../../interfaces/DiscordEmbedInt";
import { GlobalConfigInt } from "../../interfaces/GlobalConfigInt";
import { errorHandler } from "../../utils/errorHandler";

export const postSentryEmbed = async (
  CONFIG: GlobalConfigInt,
  embed: DiscordEmbedInt
): Promise<void> => {
  try {
    await fetch(CONFIG.sentryDiscordWebhook, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: `<@&${CONFIG.sentryNotificationRoleId}>, one of <@!${CONFIG.ownerId}>'s applications has encountered an error.`,
        embeds: [embed],
      }),
    });
  } catch (err) {
    errorHandler("post sentry embed", err);
  }
};
