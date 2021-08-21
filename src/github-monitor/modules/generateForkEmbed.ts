import { DiscordEmbedInt } from "../../interfaces/DiscordEmbedInt";
import { GlobalConfigInt } from "../../interfaces/GlobalConfigInt";
import { errorHandler } from "../../utils/errorHandler";
import { GithubForkInt } from "../interfaces/GithubForkInt";

/**
 * Generates a Discord embed from the Github fork data.
 *
 * @param {GlobalConfigInt} CONFIG The global config data.
 * @param {GithubForkInt} data The GitHub fork payload received from the webhook.
 * @returns {DiscordEmbedInt} A Discord embed, or `null` on error.
 */
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
        name: data.sender.login || "unknown",
        icon_url:
          data.sender.avatar_url ||
          "https://cdn.nhcarrigan.com/content/profile.jpg",
      },
      fields: [
        {
          name: "Repository",
          value: data.repository.name || "unknown",
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
