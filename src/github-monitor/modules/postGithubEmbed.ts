import fetch from "node-fetch";
import { DiscordEmbedInt } from "../../interfaces/DiscordEmbedInt";
import { GlobalConfigInt } from "../../interfaces/GlobalConfigInt";
import { errorHandler } from "../../utils/errorHandler";

export const postGithubEmbed = async (
  CONFIG: GlobalConfigInt,
  embed: DiscordEmbedInt
): Promise<void> => {
  try {
    console.table(embed);
    await fetch(CONFIG.githubDiscordWebhook, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: `<@&${CONFIG.githubNotificationRoleId}>, there has been some activity on <@!${CONFIG.ownerId}>'s GitHub.`,
        embeds: [embed],
      }),
    });
  } catch (err) {
    errorHandler(CONFIG, "send github embed", err);
  }
};
