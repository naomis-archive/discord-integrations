import { DiscordEmbedInt } from "../../interfaces/DiscordEmbedInt";
import { WakatimeDataInt } from "../interfaces/WakatimeDataInt";
import { errorHandler } from "../../utils/errorHandler";

export const parseWakatimeData = async (
  data: WakatimeDataInt
): Promise<DiscordEmbedInt | null> => {
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
      description: `On ${yesterday.range.date}, <@!465650873650118659> pent ${yesterday.grand_total.text} writing code!`,
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
        icon_url: "https://cdn.nhcarrigan.com/content/profile.jpg",
      },
      footer: {
        text: "Stats powered by Wakatime",
      },
    };

    return embed;
  } catch (err) {
    errorHandler("parse Wakatime Data", err);
    return null;
  }
};
