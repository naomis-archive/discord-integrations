import cron from "node-cron";
import { GlobalConfigInt } from "../interfaces/GlobalConfigInt";
import { logHandler } from "../utils/logHandler";
import { handleWakatimeData } from "./modules/handleWakatimeData";
import { testWakatimeWebhook } from "./modules/testWakatimeWebhook";

export const wakatimeMonitor = async (
  CONFIG: GlobalConfigInt
): Promise<void> => {
  logHandler.log("debug", "Validating Wakatime Webhook");

  const webhookValid = await testWakatimeWebhook(CONFIG);

  if (!webhookValid) {
    logHandler.log("error", "Wakatime webhook is invalid.");
    return;
  }

  logHandler.log("debug", "CRON job scheduled!");

  const monitor = cron.schedule(
    "0 8 * * *",
    () => {
      async () => {
        logHandler.log("debug", "Running CRON job");
        await handleWakatimeData(CONFIG);
      };
    },
    {
      scheduled: true,
      timezone: "America/Los_Angeles",
    }
  );

  monitor.start();
};
