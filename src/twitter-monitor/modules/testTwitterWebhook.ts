import fetch from "node-fetch";
import { GlobalConfigInt } from "../../interfaces/GlobalConfigInt";
import { errorHandler } from "../../utils/errorHandler";
import { logHandler } from "../../utils/logHandler";
import { testTwitterEmbed } from "../data/testTwitterEmbed";

export const testTwitterWebhook = async (
  CONFIG: GlobalConfigInt
): Promise<boolean> => {
  try {
    const test = await fetch(CONFIG.twitterDiscordWebhook, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: "This is a test.",
        embeds: [testTwitterEmbed],
      }),
    });

    if (test.status !== 204) {
      logHandler.log("error", "Failed to POST to your webhook.");
      return false;
    }
    return true;
  } catch (err) {
    errorHandler(CONFIG, "webhook test module", err);
    return false;
  }
};
