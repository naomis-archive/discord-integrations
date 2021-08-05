import { Request, Response } from "express";
import { GlobalConfigInt } from "../interfaces/GlobalConfigInt";
import { errorHandler } from "../utils/errorHandler";
import { logHandler } from "../utils/logHandler";
import { SentryDataInt } from "./interfaces/SentryDataInt";
import { postSentryEmbed } from "./modules/postSentryEmbed";
import { sentryDiscordEmbed } from "./modules/sentryDiscordEmbed";

export const sentryMonitor = async (
  CONFIG: GlobalConfigInt,
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const secret = req.query.secret;

    if (secret !== CONFIG.sentrySecret) {
      logHandler.log(
        "info",
        "A request to the Uptime endpoint was made with an invalid secret."
      );
      res.status(403).send("Invalid Secret");
      return;
    }

    logHandler.log(
      "info",
      "A valid request to the Uptime endpoint was received!"
    );
    const data: SentryDataInt = req.body;

    const embed = sentryDiscordEmbed(CONFIG, data);

    if (!embed) {
      res.status(400).send("Bad request");
      return;
    }

    await postSentryEmbed(CONFIG, embed);

    res.status(200).send("Event received and logged!");
  } catch (err) {
    errorHandler("uptime monitor", err);
  }
};
