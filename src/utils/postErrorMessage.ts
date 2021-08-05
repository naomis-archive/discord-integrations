import fetch from "node-fetch";
import { DiscordEmbedInt } from "../interfaces/DiscordEmbedInt";
import { GlobalConfigInt } from "../interfaces/GlobalConfigInt";
import { customSubstring } from "./customSubstring";

export const postErrorMessage = async (
  CONFIG: GlobalConfigInt,
  context: string,
  message: string,
  stack: string
): Promise<void> => {
  const embed: DiscordEmbedInt = {};

  embed.title = `Discord Integrations Error!`;
  embed.description = `There was an unexpected error with the \`${context}\` module.`;
  embed.color = 0xff0000;
  embed.fields = [
    {
      name: "Error Message",
      value: customSubstring(message, 1000),
    },
    {
      name: "Stack Trace",
      value: "```\n" + customSubstring(stack, 1000) + "\n```",
    },
  ];
  embed.footer = { text: new Date(Date.now()).toLocaleDateString() };

  await fetch(CONFIG.globalDiscordWebhook, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      content: `<@!${CONFIG.ownerId}>, I seem to have had a monitoring issue.`,
      embeds: [embed],
    }),
  });
};
