import { GlobalConfigInt } from "../../../interfaces/GlobalConfigInt";
import { errorHandler } from "../../../utils/errorHandler";
import { TootListInt } from "../interfaces/TootListInt";

/**
 * Fetches toots from the Mastodon API.
 *
 * @param {GlobalConfigInt} CONFIG The global config object.
 * @param {string} user The user to feetch for.
 * @returns {TootListInt} An array of toot data.
 */
export const fetchToots = async (
  CONFIG: GlobalConfigInt,
  user: "naomi" | "becca" | "rosalia" | "beccalia" | "nhcarrigan"
): Promise<TootListInt[] | null> => {
  try {
    const req = new URL(
      `https://mastodon.naomi.lgbt/api/v1/accounts/${CONFIG.mastodonIds[user]}/statuses`
    );

    if (CONFIG.lastMastodon[user]) {
      req.searchParams.set("since_id", CONFIG.lastMastodon[user]);
    } else {
      req.searchParams.set("limit", "1");
    }

    const raw = await fetch(req.toString());

    const data = (await raw.json()) as TootListInt[];
    return data;
  } catch (err) {
    errorHandler(CONFIG, "fetch toots module", err);
    return null;
  }
};
