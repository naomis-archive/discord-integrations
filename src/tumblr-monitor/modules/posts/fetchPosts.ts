import { GlobalConfigInt } from "../../../interfaces/GlobalConfigInt";
import { errorHandler } from "../../../utils/errorHandler";
import { TumblrPosts } from "../../interfaces/TumblrPosts";

/**
 * Fetches posts from the tumblr API.
 * These are ordered reverse-chronologically so no sorting is
 * needed, but sets the filter mode to "text" to get the content
 * as text instead of HTML.
 *
 * @param {GlobalConfigInt} CONFIG The global config object.
 * @returns {TumblrPosts} An array of tweet data.
 */
export const fetchPosts = async (
  CONFIG: GlobalConfigInt
): Promise<TumblrPosts | null> => {
  try {
    const req = new URL(
      `https://api.tumblr.com/v2/blog/nhcarrigan.tumblr.com/posts`
    );
    req.searchParams.set("api_key", CONFIG.tumblrApiKey);
    req.searchParams.set("filter", "text");

    const raw = await fetch(req.toString(), {
      method: "GET",
      headers: {
        "User-Agent": "Naomi's Discord Integrations",
      },
    });

    const data = (await raw.json()) as TumblrPosts;
    return data;
  } catch (err) {
    errorHandler(CONFIG, "fetch tumblr posts", err);
    return null;
  }
};
