import { GlobalConfigInt } from "../interfaces/GlobalConfigInt";
import express from "express";
import { readFile } from "fs/promises";
import http from "http";
import https from "https";
import { logHandler } from "../utils/logHandler";
import path from "path";
import { uptimeMonitor } from "../uptime-monitor/uptimeMonitor";
import { sentryMonitor } from "../sentry-monitor/sentryMonitor";
import { githubMonitor } from "../github-monitor/githubMonitor";

export const server = async (CONFIG: GlobalConfigInt): Promise<void> => {
  const app = express();

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
