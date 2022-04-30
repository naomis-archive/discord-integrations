import { DiscordEmbedInt } from "../../interfaces/DiscordEmbedInt";
import { GlobalConfigInt } from "../../interfaces/GlobalConfigInt";
import { customSubstring } from "../../utils/customSubstring";
import { errorHandler } from "../../utils/errorHandler";
import { updateCache } from "../../utils/updateCache";
import { IgnoredActors } from "../config/IgnoredActors";
import { GithubPullInt } from "../interfaces/GithubPullInt";

/**
 * Generates a Discord embed from the Github pull request data.
 *
 * @param {GlobalConfigInt} CONFIG The global config data.
 * @param {GithubPullInt} data The GitHub pull request data nested in the payload received from the webhook.
 * @returns {DiscordEmbedInt} A Discord embed, or `null` on error.
 */
export const generatePullEmbed = (
  CONFIG: GlobalConfigInt,
  data: GithubPullInt
): DiscordEmbedInt | null => {
  try {
    if (!["opened", "edited", "closed"].includes(data.action)) {
      return null;
    }
    if (IgnoredActors.includes(data.pull_request.user.login)) {
      return null;
    }
    const embed: DiscordEmbedInt = {
      title: "Naomi received a pull request!",
      url: data.pull_request.html_url,
      color: 0x8b4283,
      description: `A pull request was ${data.action}`,
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
          value: data.repository.name || "unknown",
        },
        {
          name: "Title",
          value: data.pull_request.title || "unknown",
        },
        {
          name: "Description",
          value: customSubstring(data.pull_request.body || "unknown", 1000),
        },
      ],
      footer: {
        text: `Pull Request number ${data.pull_request.number}`,
      },
    };

    if (data.pull_request.merged) {
      embed.description = `A pull request was merged!`;
    }
    if (data.sender.login === "nhcarrigan") {
      updateCache(CONFIG, {
        title: "Naomi worked on code",
        description: `She looked at pull #${data.pull_request.number} on ${data.repository.name}`,
        timestamp: Date.now(),
      });
    }
    return embed;
  } catch (err) {
    errorHandler(CONFIG, "pull embed generator", err);
    return null;
  }
};
