import { DiscordEmbedInt } from "../../interfaces/DiscordEmbedInt";
import { GlobalConfigInt } from "../../interfaces/GlobalConfigInt";
import { customSubstring } from "../../utils/customSubstring";
import { errorHandler } from "../../utils/errorHandler";
import { updateCache } from "../../utils/updateCache";
import { GithubIssuesInt } from "../interfaces/GithubIssuesInt";

/**
 * Generates a Discord embed from the Github issue data.
 *
 * @param {GlobalConfigInt} CONFIG The global config data.
 * @param {GithubIssuesInt} data The GitHub issue data nested in the payload received from the webhook.
 * @returns {DiscordEmbedInt} A Discord embed,, or `null` on error.
 */
export const generateIssuesEmbed = (
  CONFIG: GlobalConfigInt,
  data: GithubIssuesInt
): DiscordEmbedInt | null => {
  try {
    if (!["opened", "edited", "deleted", "closed"].includes(data.action)) {
      return null;
    }
    const embed: DiscordEmbedInt = {
      title: "Naomi has received a new issue!",
      url: data.issue.html_url,
      color: 0x8b4283,
      description: `An issue was ${data.action}!`,
      author: {
        name: data.sender.login || "unknown",
        // eslint-disable-next-line camelcase
        icon_url:
          data.sender.avatar_url ||
          "https://cdn.nhcarrigan.com/content/profile.jpg",
      },
      fields: [
        {
          name: "Repository",
          value: data.repository.name,
        },
        {
          name: "Issue Title",
          value: data.issue.title,
        },
        {
          name: "Description",
          value: customSubstring(data.issue.body, 1000),
        },
      ],
      footer: {
        text: `Issue number ${data.issue.number}`,
      },
    };
    if (data.sender.login === "nhcarrigan") {
      updateCache(CONFIG, {
        title: "Naomi looked at an issue",
        description: `She looked at pull #${data.issue.number} on ${data.repository.name}`,
        timestamp: Date.now(),
      });
    }
    return embed;
  } catch (err) {
    errorHandler(CONFIG, "issue embed generator", err);
    return null;
  }
};
