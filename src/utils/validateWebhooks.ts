import { GlobalConfigInt } from "../interfaces/GlobalConfigInt";

import { errorHandler } from "./errorHandler";
import { sendTestEmbed } from "./sendTestEmbed";

/**
 * Module to send a test embed to each webhook to confirm it is correct.
 * If adding a new monitor, need to add a test step here.
 *
 * @param {GlobalConfigInt} CONFIG The global configuration object.
 */
export const validateWebhooks = async (
  CONFIG: GlobalConfigInt
): Promise<void> => {
  try {
    const validationEmbed = {
      title: "Global Monitor is online!",
      description:
        "All webhooks have been validated and the monitor is listening for events!",
      color: 0x00ff00,
      footer: {
        text: `Running version ${process.env.npm_package_version}`,
      },
      timestamp: new Date(Date.now()),
    };
    const allHooksValid =
      (await sendTestEmbed(CONFIG, CONFIG.twitterDiscordWebhook, "Twitter")) &&
      (await sendTestEmbed(
        CONFIG,
        CONFIG.wakatimeDiscordWebhook,
        "WakaTime"
      )) &&
      (await sendTestEmbed(
        CONFIG,
        CONFIG.uptimeDiscordWebhook,
        "UptimeRobot"
      )) &&
      (await sendTestEmbed(CONFIG, CONFIG.sentryDiscordWebhook, "Sentry")) &&
      (await sendTestEmbed(CONFIG, CONFIG.githubDiscordWebhook, "Github")) &&
      (await sendTestEmbed(
        CONFIG,
        CONFIG.githubPrivateWebhook,
        "Private Github"
      )) &&
      (await sendTestEmbed(CONFIG, CONFIG.tumblrDiscordWebhook, "Tumblr"));

    if (!allHooksValid) {
      validationEmbed.title = "One or more webhooks did not initialise.";
      validationEmbed.description =
        "The monitor is still online, but may not work as intended.";
      validationEmbed.color = 0xff0000;
    }

    await fetch(CONFIG.globalDiscordWebhook, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: `Naomi, your Monitor application has come online!`,
        embeds: [validationEmbed],
      }),
    });
  } catch (err) {
    errorHandler(CONFIG, "webhook validation", err);
  }
};
