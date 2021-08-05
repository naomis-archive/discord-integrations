import fetch from "node-fetch";
import { WakatimeDataInt } from "../interfaces/WakatimeDataInt";
import { errorHandler } from "../../utils/errorHandler";
import { GlobalConfigInt } from "../../interfaces/GlobalConfigInt";

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
