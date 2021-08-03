import { errorHandler } from "../../utils/errorHandler";
import fetch from "node-fetch";
import { logHandler } from "../../utils/logHandler";
import { testWakatimeEmbed } from "../data/testWakatimeEmbed";
import { GlobalConfigInt } from "../../interfaces/GlobalConfigInt";

export const testWakatimeWebhook = async (
  CONFIG: GlobalConfigInt
): Promise<boolean> => {
  try {
    const test = await fetch(CONFIG.wakatimeDiscordWebhook, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        embeds: [testWakatimeEmbed],
      }),
    });

    if (test.status !== 204) {
      logHandler.log("error", "Failed to POST to your webhook.");
      return false;
    }
    return true;
  } catch (err) {
    errorHandler("webhook test module", err);
    return false;
  }
};
