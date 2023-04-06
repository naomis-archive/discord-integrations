import { APIEmbed } from "discord-api-types/v10";

import { GlobalConfigInt } from "../../../interfaces/GlobalConfigInt";
import { errorHandler } from "../../../utils/errorHandler";
import { ParsedTootInt } from "../interfaces/ParsedTootInt";

/**
 * Takes parsed toot data and posts it to a Discord webhook.
 *
 * @param {GlobalConfigInt} CONFIG - The global config object.
 * @param {ParsedTootInt} toot - The parsed toot object to send.
 * @param {string} user - The user that tooted.
 */
export const sendToot = async (
  CONFIG: GlobalConfigInt,
  toot: ParsedTootInt,
  user: "naomi" | "becca" | "rosalia" | "beccalia" | "nhcarrigan"
): Promise<void> => {
  try {
    const firstEmbed: APIEmbed = {
      title: `${user[0].toUpperCase()}${user.slice(1)} ${toot.title}`,
      description: toot.content,
      fields: [
        {
          name: "Links",
          value: toot.links,
        },
      ],
      color: 0x3a3240,
      author: {
        name: toot.username,
        // eslint-disable-next-line camelcase
        icon_url: toot.avatar,
        url: toot.profile,
      },
      url: toot.tootUrl,
    };

    const imageEmbeds: APIEmbed[] = [];

    if (toot.images?.length) {
      firstEmbed.image = {
        url: toot.images[0],
      };
      if (toot.images.length > 1) {
        for (const image of toot.images.slice(1)) {
          imageEmbeds.push({
            url: toot.tootUrl,
            image: {
              url: image,
            },
          });
        }
      }
    }
    await fetch(CONFIG.mastodonDiscordWebhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: `Hey there <@&${CONFIG.mastodonNotificationRoleId}>, Naomi did a toot!`,
        embeds: [firstEmbed, ...imageEmbeds],
      }),
    });
  } catch (err) {
    errorHandler(CONFIG, "toot sender", err);
  }
};
