import { DiscordEmbedInt } from "../../interfaces/DiscordEmbedInt";
import { GlobalConfigInt } from "../../interfaces/GlobalConfigInt";
import { customSubstring } from "../../utils/customSubstring";
import { errorHandler } from "../../utils/errorHandler";
import { GithubIssuesInt } from "../interfaces/GithubIssuesInt";

export const generateIssuesEmbed = (
  CONFIG: GlobalConfigInt,
  data: GithubIssuesInt
): DiscordEmbedInt | null => {
  try {
    if (["opened", "edited", "deleted", "closed"].includes(data.action)) {
      return null;
    }
    const embed: DiscordEmbedInt = {
      title: "New Issue Activity!",
      url: data.issue.html_url,
      color: 0x8b4283,
      description: `An issue was ${data.action}!`,
      author: {
        name: data.sender.login || "unknown",
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
    return embed;
  } catch (err) {
    errorHandler(CONFIG, "issue embed generator", err);
    return null;
  }
};
