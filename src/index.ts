import * as Sentry from "@sentry/node";
import { RewriteFrames } from "@sentry/integrations";
import { validateEnv } from "./utils/validateEnv";
import { logHandler } from "./utils/logHandler";
import { twitterMonitor } from "./twitter-monitor/twitterMonitor";
import { wakatimeMonitor } from "./wakatime-monitor/wakatimeMonitor";
import { server } from "./server/server";
import { validateWebhooks } from "./utils/validateWebhooks";

const initialise = async () => {
  logHandler.log("debug", "Validating environment variables.");
  const CONFIG = await validateEnv();

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

  logHandler.log("debug", "Loading Wakatime monitor");
  await wakatimeMonitor(CONFIG);
};

initialise();
