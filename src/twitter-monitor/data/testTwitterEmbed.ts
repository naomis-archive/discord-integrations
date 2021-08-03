import { DiscordEmbedInt } from "../../interfaces/DiscordEmbedInt";

export const testTwitterEmbed: DiscordEmbedInt = {
  title: "Twitter Monitor Online!",
  description: "The monitor has been started and the interval is set.",
  color: 0x00ff00,
  footer: {
    text: `Version: ${process.env.npm_package_version}`,
  },
};
