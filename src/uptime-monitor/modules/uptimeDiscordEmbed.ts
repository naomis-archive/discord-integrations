import { DiscordEmbedInt } from "../../interfaces/DiscordEmbedInt";
import { GlobalConfigInt } from "../../interfaces/GlobalConfigInt";
import { errorHandler } from "../../utils/errorHandler";
import { UptimeDataInt } from "../interfaces/UptimeDataInt";
import { parseUptimeSeconds } from "./parseUptimeSeconds";

/**
 * This function takes the data from the Uptime Monitor and
 * formats it into a Discord embed.
 *
 * @param {GlobalConfigInt} CONFIG The global configuration object.
 * @param {UptimeDataInt} data The data from the Uptime Monitor.
 * @returns {DiscordEmbedInt} The formatted Discord embed, or `null` on error.
 */
export const uptimeDiscordEmbed = (
  CONFIG: GlobalConfigInt,
  data: UptimeDataInt
): DiscordEmbedInt | null => {
  try {
    const embed: DiscordEmbedInt = {};
    embed.footer = {
      text: new Date(parseInt(data.alertDateTime) * 1000).toLocaleDateString(),
    };
    embed.url = data.monitorURL;
    embed.fields = [
      {
        name: "Status",
        value: data.alertDetails,
      },
    ];
    embed.title = "Title error oh no!";

    if (data.alertType === "1") {
      embed.title = data.monitorFriendlyName + " is DOWN!";
      embed.color = 0xff0000;
    }
    if (data.alertType === "2") {
      embed.title = data.monitorFriendlyName + " is UP!";
      embed.color = 0x00ff00;
      embed.fields.push({
        name: "Outage Duration",
        value: parseUptimeSeconds(CONFIG, data.alertDuration),
      });
    }
    if (data.alertType === "3") {
      embed.title = "SSL Alert on " + data.monitorFriendlyName;
      embed.color = 0xffff00;
      embed.fields = [
        {
          name: "Days until Expiration",
          value: data.sslExpiryDaysLeft,
        },
      ];
    }

    return embed;
  } catch (err) {
    errorHandler(CONFIG, "uptime discord embed", err);
    return null;
  }
};
