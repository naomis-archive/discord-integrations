import { DiscordEmbedInt } from "../../interfaces/DiscordEmbedInt";

export const noWakatimeYesterday: DiscordEmbedInt = {
  title: "No Activity Yesterday",
  description: `It seems <@!${process.env.OWNER_DISCORD_ID}> did not write any code yesterday...`,
  color: 0xffff00,
};
