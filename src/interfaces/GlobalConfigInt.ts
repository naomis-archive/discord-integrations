export interface GlobalConfigInt {
  // global values
  sentryDsn: string;
  ownerId: string;
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
  githubNotificationRoleId: string;
}
