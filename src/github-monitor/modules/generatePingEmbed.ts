import { DiscordEmbedInt } from "../../interfaces/DiscordEmbedInt";
import { GlobalConfigInt } from "../../interfaces/GlobalConfigInt";
import { errorHandler } from "../../utils/errorHandler";
import { updateCache } from "../../utils/updateCache";
import { GithubPingInt } from "../interfaces/GithubPingInt";

/**
 * Generates a Discord embed from the Github ping data.
 *
 * @param {GlobalConfigInt} CONFIG The global config data.
 * @param {GithubPingInt} data The GitHub ping payload received from the webhook.
 * @returns {DiscordEmbedInt} A Discord embed, or `null` on error.
 */
export const generatePingEmbed = (
  CONFIG: GlobalConfigInt,
  data: GithubPingInt
): DiscordEmbedInt | null => {
  try {
    const embed: DiscordEmbedInt = {
      title: "Naomi has a new project!",
      url: data.repository.html_url,
      color: 0x8b4283,
      description: `I will now watch for activity on the \`${data.repository.name}\` project.`,
      author: {
        name: data.sender.login || "unknown",
        icon_url:
          data.sender.avatar_url ||
          "https://cdn.nhcarrigan.com/content/profile.jpg",
      },
      fields: [
        {
          name: "Owner",
          value: data.repository.owner.login || "Unknown.",
        },
        {
          name: "Description",
          value: data.repository.description || "None provided.",
        },
      ],
      footer: {
        text: data.zen,
      },
    };
    updateCache(CONFIG, {
      title: "Naomi Created a Project",
      description: `She is starting work on the ${data.repository.owner.login}/${data.repository.name} repo.`,
      timestamp: Date.now(),
    });
    return embed;
  } catch (err) {
    errorHandler(CONFIG, "ping embed generator", err);
    return null;
  }
};
