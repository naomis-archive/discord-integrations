/**
 * This is the structure of the global configuration object.
 * That object is used to pass around the environment variables,
 * to avoid having to coerce types.
 */

export interface GlobalConfigInt {
  // global values
  sentryDsn: string;
  globalDiscordWebhook: string;
  environment: "development" | "production";
  // twitter monitor
  twitterToken: string;
  twitterId: string;
  twitterDiscordWebhook: string;
  twitterNotificationRoleId: string;
  lastTweet: string;
  // wakatime monitor
  wakatimeApiKey: string;
  wakatimeNotificationRoleId: string;
  wakatimeDiscordWebhook: string;
  // uptime monitor
  uptimeSecret: string;
  uptimeDiscordWebhook: string;
  uptimeNotificationRoleId: string;
  // sentry monitor
  sentrySecret: string;
  sentryDiscordWebhook: string;
  sentryNotificationRoleId: string;
  // github monitor
  githubSecret: string;
  githubDiscordWebhook: string;
  githubPrivateWebhook: string;
  githubNotificationRoleId: string;
  // tumblr monitor
  tumblrApiKey: string;
  tumblrDiscordWebhook: string;
  tumblrNotificationRoleId: string;
  lastTumblr: string;
}
