import { readFile } from "fs/promises";
import http from "http";
import https from "https";
import path from "path";

import cors from "cors";
import express from "express";

import { githubMonitor } from "../github-monitor/githubMonitor";
import { GlobalConfigInt } from "../interfaces/GlobalConfigInt";
import { sentryMonitor } from "../sentry-monitor/sentryMonitor";
import { uptimeMonitor } from "../uptime-monitor/uptimeMonitor";
import { logHandler } from "../utils/logHandler";

/**
 * This instantiates the Express server and mounts the endpoint middleware.
 *
 * @param {GlobalConfigInt} CONFIG The global config object.
 */
export const server = async (CONFIG: GlobalConfigInt): Promise<void> => {
  const app = express();

  const allowedOrigins = [
    "https://www.nhcarrigan.com",
    "https://nhcarrigan.com",
    "http://localhost:4200",
  ];

  app.use(
    cors({
      origin: (origin, callback) => {
        if (!origin || !allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error("Not allowed by CORS"));
        }
      },
    })
  );

  app.use(express.json());

  // uptime monitor middleware
  logHandler.log("http", "uptime monitor mounted");
  app.post(
    "/uptime",
    async (req, res) => await uptimeMonitor(CONFIG, req, res)
  );

  // sentry monitor middleware
  logHandler.log("http", "sentry monitor mounted");
  app.post(
    "/sentry",
    async (req, res) => await sentryMonitor(CONFIG, req, res)
  );

  // github monitor middleware
  logHandler.log("http", "github monitor mounted");
  app.post(
    "/github",
    async (req, res) => await githubMonitor(CONFIG, req, res)
  );

  // activity endpoint
  app.get("/activity", (req, res) => {
    res.json(CONFIG.activityCache);
  });

  // root url
  app.use("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./views/index.html"));
  });

  const httpServer = http.createServer(app);

  httpServer.listen(1080, () => {
    logHandler.log("http", "http server listening on port 80");
  });

  if (CONFIG.environment === "production") {
    const privateKey = await readFile(
      "/etc/letsencrypt/live/discord-integrations.nhcarrigan.com/privkey.pem",
      "utf8"
    );
    const certificate = await readFile(
      "/etc/letsencrypt/live/discord-integrations.nhcarrigan.com/cert.pem",
      "utf8"
    );
    const ca = await readFile(
      "/etc/letsencrypt/live/discord-integrations.nhcarrigan.com/chain.pem",
      "utf8"
    );

    const credentials = {
      key: privateKey,
      cert: certificate,
      ca: ca,
    };

    const httpsServer = https.createServer(credentials, app);

    httpsServer.listen(1443, () => {
      logHandler.log("http", "https server listening on port 443");
    });
  }
};
