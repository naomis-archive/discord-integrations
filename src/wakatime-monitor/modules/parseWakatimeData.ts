import { DiscordEmbedInt } from "../../interfaces/DiscordEmbedInt";
import { GlobalConfigInt } from "../../interfaces/GlobalConfigInt";
import { errorHandler } from "../../utils/errorHandler";
import { WakatimeDataInt } from "../interfaces/WakatimeDataInt";

/**
 * Parses Wakatime Data into a Discord Embed.
 *
 * @param {GlobalConfigInt} CONFIG The global configuration object.
 * @param {WakatimeDataInt} data The data received from the Wakatime API.
 * @returns {DiscordEmbedInt} The Discord Embed, or `null` on error.
 */
export const parseWakatimeData = (
  CONFIG: GlobalConfigInt,
  data: WakatimeDataInt
): DiscordEmbedInt | null => {
  try {
    const projectList: string[] = [];
    const languageList: string[] = [];

    const yesterday = data.data.find((el) => el.range.text === "Yesterday");
    if (!yesterday) {
      return null;
    }
    yesterday.projects.forEach((project) => {
      projectList.push(
        `**${project.name}**: ${project.digital} (${project.percent}%)`
      );
    });
    yesterday.languages.forEach((language) => {
      languageList.push(
        `**${language.name}**: ${language.digital} (${language.percent}%)`
      );
    });

    if (
      !projectList.length &&
      !languageList.length &&
      yesterday.grand_total.text === "0 secs"
    ) {
      return null;
    }

    const embed: DiscordEmbedInt = {
      title: "Yesterday's Coding Activity",
      description: `On ${yesterday.range.date}, <@!465650873650118659> spent ${yesterday.grand_total.text} writing code!`,
      color: 0x00ff00,
      fields: [
        {
          name: "Projects",
          value: projectList.join("\n") || "No project data found...",
        },
        {
          name: "Languages",
          value: languageList.join("\n") || "No language data found...",
        },
      ],
      author: {
        name: "nhcarrigan",
        // eslint-disable-next-line camelcase
        icon_url: "https://cdn.nhcarrigan.com/content/profile.jpg",
      },
      footer: {
        text: "Stats powered by Wakatime",
      },
    };

    return embed;
  } catch (err) {
    errorHandler(CONFIG, "parse Wakatime Data", err);
    return null;
  }
};
