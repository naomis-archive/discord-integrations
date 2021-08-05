import { DiscordEmbedInt } from "../../interfaces/DiscordEmbedInt";
import { GlobalConfigInt } from "../../interfaces/GlobalConfigInt";
import { errorHandler } from "../../utils/errorHandler";
import { GithubStarInt } from "../interfaces/GithubStarInt";

export const generateStarEmbed = (
  CONFIG: GlobalConfigInt,
  data: GithubStarInt
): DiscordEmbedInt | null => {
  try {
    const embed: DiscordEmbedInt = {
      title: "A star is born!",
      url: data.repository.html_url,
      color: 0x8b4283,
      description: `The following repository has ${
        data.action === "created" ? "gained" : "lost"
      } a star.`,
      author: {
        name: data.sender.login,
        icon_url: data.sender.avatar_url,
      },
      fields: [
        {
          name: "Repository",
          value: data.repository.name,
        },
      ],
      footer: {
        text: `This repository now has ${data.repository.stargazers_count} stars.`,
      },
    };
    return embed;
  } catch (err) {
    errorHandler(CONFIG, "star embed generator", err);
    return null;
  }
};
