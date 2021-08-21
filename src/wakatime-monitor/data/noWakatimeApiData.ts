import { DiscordEmbedInt } from "../../interfaces/DiscordEmbedInt";

/**
 * Fallback Discord embed object for cases where the Wakatime
 * API errors out.
 */
export const noWakatimeApiData: DiscordEmbedInt = {
  title: "API Error!",
  description: "The API did not return any data!",
  color: 0xff0000,
};
