import { DiscordEmbedInt } from "../../interfaces/DiscordEmbedInt";

export const testWakatimeEmbed: DiscordEmbedInt = {
  title: "Wakatime Monitor Online!",
  description: "The monitor has been started and the CRON job is scheduled.",
  color: 0x00ff00,
  footer: {
    text: `Version: ${process.env.npm_package_version}`,
  },
};
