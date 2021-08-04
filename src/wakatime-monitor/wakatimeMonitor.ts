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

  setInterval(async () => {
    logHandler.log("debug", "Running Wakatime Monitor");
    const currentHour = new Date(Date.now()).getHours();

    if (currentHour === 9) {
      await handleWakatimeData(CONFIG);
    } else {
      logHandler.log(
        "debug",
        `Skipping Wakatime run as ${currentHour} is not 9`
      );
    }
  }, 3600000);
};
