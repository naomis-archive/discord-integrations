import fetch from "node-fetch";

import { GlobalConfigInt } from "../interfaces/GlobalConfigInt";

import { errorHandler } from "./errorHandler";

/**
 * Sends a test embed to the specified Discord webhook.
 *
 * @param {GlobalConfigInt} CONFIG The global config object.
 * @param {string} url The Discord Webhook URL.
 * @param {string} name The name of the Webhook (i.e. Sentry).
 * @returns {boolean} True if the embed sends correctly, false otherwise.
 */
export const sendTestEmbed = async (
  CONFIG: GlobalConfigInt,
  url: string,
  name: string
): Promise<boolean> => {
  try {
    const embed = {
      title: "Hello World!",
      description: `This embed confirms that the ${name} webhook is valid!`,
      color: 0x8b4283,
      footer: {
        text: `Version: ${process.env.npm_package_version}`,
      },
    };
    const test = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: "This is a test.",
        embeds: [embed],
      }),
    });

    return test.status === 204;
  } catch (err) {
    errorHandler(CONFIG, "send test embed", err);
    return false;
  }
};
