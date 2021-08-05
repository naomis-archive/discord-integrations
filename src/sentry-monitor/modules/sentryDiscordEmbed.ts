import { DiscordEmbedInt } from "../../interfaces/DiscordEmbedInt";
import { GlobalConfigInt } from "../../interfaces/GlobalConfigInt";
import { errorHandler } from "../../utils/errorHandler";
import { SentryDataInt } from "../interfaces/SentryDataInt";

export const sentryDiscordEmbed = (
  CONFIG: GlobalConfigInt,
  data: SentryDataInt
): DiscordEmbedInt | null => {
  try {
    const embed: DiscordEmbedInt = {};
    embed.title = `Error in ${data.project}`;
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
    errorHandler("sentry discord embed", err);
    return null;
  }
};
