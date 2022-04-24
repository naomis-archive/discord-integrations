import fetch from "node-fetch";

import { DiscordEmbedInt } from "../../interfaces/DiscordEmbedInt";
import { GlobalConfigInt } from "../../interfaces/GlobalConfigInt";
import { errorHandler } from "../../utils/errorHandler";

/**
 * Generates a Discord embed from the Github comment data.
 *
 * @param {GlobalConfigInt} CONFIG The global config data.
 * @param {DiscordEmbedInt} embed The Discord embed object.
 * @param {boolean} privateRepo Whether the repo is a private repo or not.
 */
export const postGithubEmbed = async (
  CONFIG: GlobalConfigInt,
  embed: DiscordEmbedInt,
  privateRepo: boolean
): Promise<void> => {
  try {
    const target = privateRepo
      ? CONFIG.githubPrivateWebhook
      : CONFIG.githubDiscordWebhook;
    const message = privateRepo
      ? "There has been some activity on one of Naomi's private repos."
      : `<@&${CONFIG.githubNotificationRoleId}>, there has been some activity on Naomi's GitHub.`;
    await fetch(target, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: message,
        embeds: [embed],
      }),
    });
  } catch (err) {
    errorHandler(CONFIG, "send github embed", err);
  }
};
