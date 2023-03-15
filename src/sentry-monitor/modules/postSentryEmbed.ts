import { DiscordEmbedInt } from "../../interfaces/DiscordEmbedInt";
import { GlobalConfigInt } from "../../interfaces/GlobalConfigInt";
import { errorHandler } from "../../utils/errorHandler";

/**
 * Posts a discord embed object to the Sentry Discord webhook.
 *
 * @param {GlobalConfigInt} CONFIG The global config object.
 * @param {DiscordEmbedInt} embed The Discord embed to send.
 */
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
        content: `<@&${CONFIG.sentryNotificationRoleId}>, one of Naomi's applications has encountered an error.`,
        embeds: [embed],
      }),
    });
  } catch (err) {
    errorHandler(CONFIG, "post sentry embed", err);
  }
};
