export interface GlobalConfigInt {
  // global values
  sentryDsn: string;
  ownerId: string;
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
}
