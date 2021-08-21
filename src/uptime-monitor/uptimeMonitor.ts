import { Request, Response } from "express";
import { GlobalConfigInt } from "../interfaces/GlobalConfigInt";
import { errorHandler } from "../utils/errorHandler";
import { logHandler } from "../utils/logHandler";
import { UptimeDataInt } from "./interfaces/UptimeDataInt";
import { postUptimeEmbed } from "./modules/postUptimeEmbed";
import { uptimeDiscordEmbed } from "./modules/uptimeDiscordEmbed";

/**
 * This function handles requests to the `/uptime` endpoint.
 *
 * @param {GlobalConfigInt} CONFIG The global config object.
 * @param {Request} req The request data parsed by Express.
 * @param {Response} res The response data parsed by Express.
 */
export const uptimeMonitor = async (
  CONFIG: GlobalConfigInt,
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const secret = req.query.secret;

    if (secret !== CONFIG.uptimeSecret) {
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
    const data: UptimeDataInt = req.body;

    const embed = uptimeDiscordEmbed(CONFIG, data);

    if (!embed) {
      res.status(400).send("Bad request");
      return;
    }

    await postUptimeEmbed(CONFIG, embed);

    res.status(200).send("Event received and logged!");
  } catch (err) {
    errorHandler(CONFIG, "uptime monitor", err);
  }
};
