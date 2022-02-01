import { DiscordEmbedInt } from "../../interfaces/DiscordEmbedInt";
import { GlobalConfigInt } from "../../interfaces/GlobalConfigInt";
import { errorHandler } from "../../utils/errorHandler";
import { SentryDataInt } from "../interfaces/SentryDataInt";

/**
 * This function converts a Sentry error object into a Discord embed.
 *
 * @param {GlobalConfigInt} CONFIG The global config object.
 * @param {SentryDataInt} data The Sentry error object.
 * @returns {DiscordEmbedInt} The Discord embed object, or `null` on error.
 */
export const sentryDiscordEmbed = (
  CONFIG: GlobalConfigInt,
  data: SentryDataInt
): DiscordEmbedInt | null => {
  try {
    const embed: DiscordEmbedInt = {};
    embed.title = `Naomi had an error in ${data.project}`;
    embed.description = data.message;
    embed.color = 0xff0000;
    embed.url = data.url;
    embed.fields = [
      {
        name: "Culprit",
        value: data.culprit,
      },
    ];
    return embed;
  } catch (err) {
    errorHandler(CONFIG, "sentry discord embed", err);
    return null;
  }
};
