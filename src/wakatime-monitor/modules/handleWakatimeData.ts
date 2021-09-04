import { GlobalConfigInt } from "../../interfaces/GlobalConfigInt";
import { errorHandler } from "../../utils/errorHandler";
import { noWakatimeApiData } from "../data/noWakatimeApiData";
import { noWakatimeYesterday } from "../data/noWakatimeYesterday";

import { getWakatimeData } from "./getWakatimeData";
import { parseWakatimeData } from "./parseWakatimeData";
import { postWakatimeEmbed } from "./postWakatimeEmbed";

/**
 * This function handles the Wakatime data received from the API.
 * Responds depending on the status of the API call.
 *
 * @param {GlobalConfigInt} CONFIG The global config object.
 */
export const handleWakatimeData = async (
  CONFIG: GlobalConfigInt
): Promise<void> => {
  try {
    const rawData = await getWakatimeData(CONFIG);

    if (!rawData) {
      await postWakatimeEmbed(CONFIG, noWakatimeApiData);
      return;
    }

    const parsedData = parseWakatimeData(CONFIG, rawData);

    if (!parsedData) {
      await postWakatimeEmbed(CONFIG, noWakatimeYesterday);
      return;
    }

    await postWakatimeEmbed(CONFIG, parsedData);
  } catch (err) {
    errorHandler(CONFIG, "data handler", err);
  }
};
