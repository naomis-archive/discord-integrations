import { GlobalConfigInt } from "../interfaces/GlobalConfigInt";

/**
 * Module to verify that all environment variables
 * have been set.
 *
 * @returns {GlobalConfigInt | string} The global config object with values filled in, or a string on missing values.
 */
export const validateEnv = (): GlobalConfigInt | string => {
  if (!process.env.SENTRY_DSN) {
    return "Missing Sentry DSN.";
  }
  if (!process.env.GLOBAL_DISCORD_WEBHOOK_URL) {
    return "Missing Global Webhook URL.";
  }
  if (
    process.env.NODE_ENV !== "production" &&
    process.env.NODE_ENV !== "development"
  ) {
    return "The value for the runtime environment is not correct.";
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
  if (!process.env.WAKATIME_API_KEY) {
    return "Missing the Wakatime API key.";
  }
  if (!process.env.WAKATIME_DISCORD_WEBHOOK_URL) {
    return "Missing the Discord webhook URL for Wakatime notifications";
  }
  if (!process.env.WAKATIME_NOTIFICATION_ROLE) {
    return "Missing the ID for your Wakatime notifications role.";
  }
  if (!process.env.UPTIME_SECRET) {
    return "Missing secret parameter for Uptime endpoint.";
  }
  if (!process.env.UPTIME_DISCORD_WEBHOOK_URL) {
    return "Missing the Discord webhook URL for Uptime notifications.";
  }
  if (!process.env.UPTIME_NOTIFICATION_ROLE) {
    return "Missing the ID for your Uptime notifications role.";
  }
  if (!process.env.SENTRY_SECRET) {
    return "Missing secret parameter for Sentry endpoint.";
  }
  if (!process.env.SENTRY_DISCORD_WEBHOOK_URL) {
    return "Missing the Discord webhook URL for Sentry notifications.";
  }
  if (!process.env.SENTRY_NOTIFICATION_ROLE) {
    return "Missing the ID for your Sentry notifications role.";
  }
  if (!process.env.GITHUB_SECRET) {
    return "Missing secret parameter for GitHub endpoint.";
  }
  if (!process.env.GITHUB_DISCORD_WEBHOOK_URL) {
    return "Missing the Discord webhook URL for GitHub notifications.";
  }
  if (!process.env.GITHUB_PRIVATE_WEBHOOK_URL) {
    return "Missing the private GitHub Webhook URL";
  }
  if (!process.env.GITHUB_NOTIFICATION_ROLE) {
    return "Missing the ID for your GitHub notifications role.";
  }
  if (!process.env.TUMBLR_API_KEY) {
    return "Missing the Tumblr API key.";
  }
  if (!process.env.TUMBLR_DISCORD_WEBHOOK_URL) {
    return "Missing the Discord webhook URL for Tumblr notifications";
  }
  if (!process.env.TUMBLR_NOTIFICATION_ROLE) {
    return "Missing the ID for your Tumblr notifications role.";
  }

  const CONFIG: GlobalConfigInt = {
    sentryDsn: process.env.SENTRY_DSN,
    globalDiscordWebhook: process.env.GLOBAL_DISCORD_WEBHOOK_URL,
    environment: process.env.NODE_ENV,
    twitterDiscordWebhook: process.env.TWITTER_DISCORD_WEBHOOK_URL,
    twitterId: process.env.TWITTER_USER_ID,
    twitterToken: process.env.TWITTER_BEARER_TOKEN,
    twitterNotificationRoleId: process.env.TWITTER_NOTIFICATION_ROLE,
    lastTweet: "",
    wakatimeApiKey: process.env.WAKATIME_API_KEY,
    wakatimeDiscordWebhook: process.env.WAKATIME_DISCORD_WEBHOOK_URL,
    wakatimeNotificationRoleId: process.env.WAKATIME_NOTIFICATION_ROLE,
    uptimeSecret: process.env.UPTIME_SECRET,
    uptimeDiscordWebhook: process.env.UPTIME_DISCORD_WEBHOOK_URL,
    uptimeNotificationRoleId: process.env.UPTIME_NOTIFICATION_ROLE,
    sentrySecret: process.env.SENTRY_SECRET,
    sentryDiscordWebhook: process.env.SENTRY_DISCORD_WEBHOOK_URL,
    sentryNotificationRoleId: process.env.SENTRY_NOTIFICATION_ROLE,
    githubSecret: process.env.GITHUB_SECRET,
    githubDiscordWebhook: process.env.GITHUB_DISCORD_WEBHOOK_URL,
    githubNotificationRoleId: process.env.GITHUB_NOTIFICATION_ROLE,
    githubPrivateWebhook: process.env.GITHUB_PRIVATE_WEBHOOK_URL,
    tumblrApiKey: process.env.TUMBLR_API_KEY,
    tumblrDiscordWebhook: process.env.TUMBLR_DISCORD_WEBHOOK_URL,
    tumblrNotificationRoleId: process.env.TUMBLR_NOTIFICATION_ROLE,
    lastTumblr: "",
  };

  return CONFIG;
};
