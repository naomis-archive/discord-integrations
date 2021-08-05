import { DiscordEmbedInt } from "../../interfaces/DiscordEmbedInt";
import { GlobalConfigInt } from "../../interfaces/GlobalConfigInt";
import { errorHandler } from "../../utils/errorHandler";

export const generatorName = (
  CONFIG: GlobalConfigInt,
  data: any
): DiscordEmbedInt | null => {
  try {
    const embed: DiscordEmbedInt = {
      title: "",
      url: "",
      color: 0x8b4283,
      description: "",
      author: {
        name: data.sender.login,
        icon_url: data.sender.avatar_url,
      },
      fields: [],
      footer: {
        text: "",
      },
    };
    return embed;
  } catch (err) {
    errorHandler(CONFIG, "generator", err);
    return null;
  }
};
