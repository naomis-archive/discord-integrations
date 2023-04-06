import { NodeHtmlMarkdown } from "node-html-markdown";

import { GlobalConfigInt } from "../../../interfaces/GlobalConfigInt";
import { errorHandler } from "../../../utils/errorHandler";
import { ParsedTootInt } from "../interfaces/ParsedTootInt";
import { TootListInt } from "../interfaces/TootListInt";

/**
 * This parses a toot object into a new object.
 * Will modify the new object based on the type of
 * the toot (ie quote toot vs reply vs original).
 *
 * @param {GlobalConfigInt} CONFIG The global config object.
 * @param {TootListInt} toot - A single toot object received from the API.
 * @returns {ParsedTootInt} - A new object representing the toot, or `null` on error.
 */
export const parseToot = (
  CONFIG: GlobalConfigInt,
  toot: TootListInt
): ParsedTootInt | null => {
  try {
    const author = toot.account.display_name;

    const reToot = toot.reblog;
    const replied = !!toot.in_reply_to_id;

    let title = "Posted";

    const content = reToot
      ? NodeHtmlMarkdown.translate(reToot.content)
      : NodeHtmlMarkdown.translate(toot.content);

    let links = `[See my Post](${toot.url})`;

    if (reToot) {
      title = "Reposted";
      links += `\n[Reposted from here](${reToot.url})`;
    } else if (replied) {
      title = "Replied";
    }

    const images = toot.media_attachments.map((el) => el.url);

    return {
      title,
      content,
      links,
      username: author,
      avatar: toot.account.avatar,
      profile: toot.account.url,
      images,
      tootUrl: toot.url,
    };
  } catch (err) {
    errorHandler(CONFIG, "toot parser", err);
    return null;
  }
};
