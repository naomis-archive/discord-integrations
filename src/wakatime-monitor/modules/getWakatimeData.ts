import fetch from "node-fetch";

import { GlobalConfigInt } from "../../interfaces/GlobalConfigInt";
import { errorHandler } from "../../utils/errorHandler";
import { WakatimeDataInt } from "../interfaces/WakatimeDataInt";

/**
 * THis function makes a request to the Wakatime API for activity within
 * the last 24 hours.
 *
 * @param {GlobalConfigInt} CONFIG The global config object.
 * @returns {WakatimeDataInt} The Wakatime Data, or `null` on error.
 */
export const getWakatimeData = async (
  CONFIG: GlobalConfigInt
): Promise<WakatimeDataInt | null> => {
  try {
    const start = new Date(Date.now() - 86400000).toLocaleDateString("en-CA");
    const end = new Date(Date.now()).toLocaleDateString("en-CA");
    const rawData = await fetch(
      `https://wakatime.com/api/v1/users/current/summaries?start=${start}&end=${end}&api_key=${CONFIG.wakatimeApiKey}`,
      {
        method: "GET",
      }
    );

    const data = (await rawData.json()) as WakatimeDataInt;

    return data;
  } catch (err) {
    errorHandler(CONFIG, "get Wakatime Data", err);
    return null;
  }
};
