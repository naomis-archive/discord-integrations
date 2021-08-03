import * as Sentry from "@sentry/node";
import { RewriteFrames } from "@sentry/integrations";

const initialise = async () => {
  console.log("I'm alive~!");

  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    tracesSampleRate: 1.0,
    integrations: [
      new RewriteFrames({
        root: global.__dirname,
      }),
    ],
  });
};

initialise();
