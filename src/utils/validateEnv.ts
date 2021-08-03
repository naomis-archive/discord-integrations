import { GlobalConfigInt } from "../interfaces/GlobalConfigInt";

/**
 * Module to verify that all environment variables
 * have been set.
 */
export const validateEnv = async (): Promise<GlobalConfigInt | string> => {
  if (!process.env.SENTRY_DSN) {
    return "Missing Sentry DSN.";
  }
  if (!process.env.TWITTER_DISCORD_WEBHOOK_URL) {
    return "Missing the Discord Webhook URL for Twitter notifications.";
  }
  if (!process.env.TWITTER_USER_ID) {
    return "Missing the User ID for the Twitter account to follow.";
  }
  if (!process.env.TWITTER_BEARER_TOKEN) {
    return "Missing the Twitter API Bearer Token.";
  }
  if (!process.env.TWITTER_NOTIFICATION_ROLE) {
    return "Missing the ID for your Twitter notifications role.";
  }

  const CONFIG: GlobalConfigInt = {
    sentryDsn: process.env.SENTRY_DSN,
    twitterDiscordWebhook: process.env.TWITTER_DISCORD_WEBHOOK_URL,
    twitterId: process.env.TWITTER_USER_ID,
    twitterToken: process.env.TWITTER_BEARER_TOKEN,
    twitterNotificationRoleId: process.env.TWITTER_NOTIFICATION_ROLE,
    lastTweet: "",
  };

  return CONFIG;
};
