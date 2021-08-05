import { DiscordEmbedInt } from "../../interfaces/DiscordEmbedInt";
import { GlobalConfigInt } from "../../interfaces/GlobalConfigInt";
import { errorHandler } from "../../utils/errorHandler";
import { GithubCommentInt } from "../interfaces/GithubCommentInt";

export const generateCommentInt = (
  CONFIG: GlobalConfigInt,
  data: GithubCommentInt
): DiscordEmbedInt | null => {
  try {
    const embed: DiscordEmbedInt = {
      title: "New Comment Activity!",
      url: data.comment.html_url,
      color: 0x8b4283,
      description: `A comment was ${data.action}`,
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
        {
          name: "Comment",
          value: data.comment.body || "unknown",
        },
      ],
      footer: {
        text: `Issue number ${data.issue.number}`,
      },
    };
    return embed;
  } catch (err) {
    errorHandler(CONFIG, "generate comment embed", err);
    return null;
  }
};
