import { Request, Response } from "express";
import { DiscordEmbedInt } from "../interfaces/DiscordEmbedInt";
import { GlobalConfigInt } from "../interfaces/GlobalConfigInt";
import { errorHandler } from "../utils/errorHandler";
import { logHandler } from "../utils/logHandler";
import { IgnoredActors } from "./config/IgnoredActors";
import { GithubHeadersInt } from "./interfaces/GithubHeadersInt";
import { generateCommentInt } from "./modules/generateCommentEmbed";
import { generateForkEmbed } from "./modules/generateForkEmbed";
import { generateIssuesEmbed } from "./modules/generateIssueEmbed";
import { generatePingEmbed } from "./modules/generatePingEmbed";
import { generatePullEmbed } from "./modules/generatePullEmbed";
import { generateStarEmbed } from "./modules/generateStarEmbed";
import { postGithubEmbed } from "./modules/postGithubEmbed";

export const githubMonitor = async (
  CONFIG: GlobalConfigInt,
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const secret = req.query.secret;

    if (secret !== CONFIG.githubSecret) {
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
    const headers = req.headers as GithubHeadersInt;

    if (IgnoredActors.includes(req.body.sender?.login)) {
      logHandler.log("info", "But it was from a bad actor...");
      res.status(200).send("Ingoring this author...");
      return;
    }
    let embed: DiscordEmbedInt | null = null;

    switch (headers["x-github-event"]) {
      case "ping":
        embed = generatePingEmbed(CONFIG, req.body);
        break;
      case "star":
        embed = generateStarEmbed(CONFIG, req.body);
        break;
      case "issues":
        embed = generateIssuesEmbed(CONFIG, req.body);
        break;
      case "pull_request":
        embed = generatePullEmbed(CONFIG, req.body);
        break;
      case "issue_comment":
        embed = generateCommentInt(CONFIG, req.body);
        break;
      case "fork":
        embed = generateForkEmbed(CONFIG, req.body);
        break;
      default:
        logHandler.log("info", "But it was not a supported Github event...");
    }

    if (!embed) {
      res.status(200).send("Bad request");
      return;
    }

    await postGithubEmbed(CONFIG, embed);

    res.status(200).send("Event received and logged!");
  } catch (err) {
    errorHandler(CONFIG, "uptime monitor", err);
  }
};
