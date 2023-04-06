import { RewriteFrames } from "@sentry/integrations";
import * as Sentry from "@sentry/node";

import { mastodonMonitor } from "./mastodon-monitor/mastodonMonitor";
import { server } from "./server/server";
import { tumblrMonitor } from "./tumblr-monitor/tumblrMonitor";
import { twitterMonitor } from "./twitter-monitor/twitterMonitor";
import { logHandler } from "./utils/logHandler";
import { validateEnv } from "./utils/validateEnv";
import { validateWebhooks } from "./utils/validateWebhooks";
// import { wakatimeMonitor } from "./wakatime-monitor/wakatimeMonitor";

/**
 * Main entry point for the application.
 */
const initialise = async () => {
  logHandler.log("debug", "Validating environment variables.");
  const CONFIG = validateEnv();

  if (typeof CONFIG === "string") {
    logHandler.log("error", CONFIG);
    return;
  }

  logHandler.log("debug", "validating webhooks");
  await validateWebhooks(CONFIG);

  logHandler.log("debug", "Initialising Sentry monitor");
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    tracesSampleRate: 1.0,
    integrations: [
      new RewriteFrames({
        root: global.__dirname,
      }),
    ],
  });

  logHandler.log("debug", "Spinning up webserver");
  await server(CONFIG);

  logHandler.log("debug", "Loading twitter monitor.");
  await twitterMonitor(CONFIG);

  // logHandler.log("debug", "Loading Wakatime monitor");
  // wakatimeMonitor(CONFIG);

  logHandler.log("debug", "Loading Tumblr monitor.");
  await tumblrMonitor(CONFIG);

  logHandler.log("debug", "Loading Mastodon monitor.");
  await mastodonMonitor(CONFIG);
};

initialise();
