import { DiscordEmbedInt } from "../../interfaces/DiscordEmbedInt";
import { GlobalConfigInt } from "../../interfaces/GlobalConfigInt";
import { errorHandler } from "../../utils/errorHandler";
import { GithubForkInt } from "../interfaces/GithubForkInt";

export const generateForkEmbed = (
  CONFIG: GlobalConfigInt,
  data: GithubForkInt
): DiscordEmbedInt | null => {
  try {
    const embed: DiscordEmbedInt = {
      title: "New Fork!",
      url: data.forkee.html_url,
      color: 0x8b4283,
      description: "Woah! A repository was forked!",
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
        text: `This has ${data.repository.forks_count} forks.`,
      },
    };
    return embed;
  } catch (err) {
    errorHandler(CONFIG, "fork embed generator", err);
    return null;
  }
};
