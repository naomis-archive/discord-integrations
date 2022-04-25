import { GlobalConfigInt } from "../../interfaces/GlobalConfigInt";
import { errorHandler } from "../../utils/errorHandler";
import { logHandler } from "../../utils/logHandler";

import { fetchPosts } from "./posts/fetchPosts";
import { sendPost } from "./posts/sendPost";

/**
 * Wrapper to handle all of the Tumblr-Discord logic.
 *
 * @param {GlobalConfigInt} CONFIG - The environment CONFIGuration object.
 */
export const monitorPosts = async (CONFIG: GlobalConfigInt) => {
  try {
    logHandler.log("debug", "Collecting Tumblr");
    const data = await fetchPosts(CONFIG);

    if (!data) {
      logHandler.log("error", "Tumblr Posts not collected.");
      return;
    }

    const posts = data.response.posts;

    if (!posts.length) {
      logHandler.log("debug", "No new posts yet.");
      return;
    }

    if (!CONFIG.lastTumblr) {
      logHandler.log(
        "debug",
        "This appears to be the first run. No posts will be processes this time."
      );
      CONFIG.lastTumblr = posts[0].id_string;
    }

    const lastPosted = posts.findIndex(
      (post) => post.id_string === CONFIG.lastTumblr
    );

    const toPost = posts.slice(0, lastPosted);

    for (const post of toPost) {
      CONFIG.lastTumblr = post.id_string;

      logHandler.log("debug", `Sending post with ID of ${post.id_string}`);

      await sendPost(CONFIG, post);
    }
  } catch (err) {
    errorHandler(CONFIG, "monitor tumblr posts", err);
  }
};
