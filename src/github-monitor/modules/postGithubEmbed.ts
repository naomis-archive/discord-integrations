import fetch from "node-fetch";

import { DiscordEmbedInt } from "../../interfaces/DiscordEmbedInt";
import { GlobalConfigInt } from "../../interfaces/GlobalConfigInt";
import { errorHandler } from "../../utils/errorHandler";

/**
 * Generates a Discord embed from the Github comment data.
 *
 * @param {GlobalConfigInt} CONFIG The global config data.
 * @param {DiscordEmbedInt} embed The Discord embed object.
 */
export const postGithubEmbed = async (
  CONFIG: GlobalConfigInt,
  embed: DiscordEmbedInt
): Promise<void> => {
  try {
    await fetch(CONFIG.githubDiscordWebhook, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: `<@&${CONFIG.githubNotificationRoleId}>, there has been some activity on Naomi's GitHub.`,
        embeds: [embed],
      }),
    });
  } catch (err) {
    errorHandler(CONFIG, "send github embed", err);
  }
};
