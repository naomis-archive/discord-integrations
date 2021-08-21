import { GlobalConfigInt } from "../interfaces/GlobalConfigInt";
import { logHandler } from "../utils/logHandler";
import { handleWakatimeData } from "./modules/handleWakatimeData";

/**
 * Module to load the wakatime wrapper and schedule it on an interval.
 *
 * @param {GlobalConfigInt} CONFIG The global config object.
 */
export const wakatimeMonitor = async (
  CONFIG: GlobalConfigInt
): Promise<void> => {
  logHandler.log("debug", "Wakatime Monitor Scheduled!");

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
