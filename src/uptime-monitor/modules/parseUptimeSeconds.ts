import { GlobalConfigInt } from "../../interfaces/GlobalConfigInt";
import { errorHandler } from "../../utils/errorHandler";

/**
 * Parses a string of seconds into a human readable format.
 *
 * @param {GlobalConfigInt} CONFIG The global config object.
 * @param {string} secondsString The seconds to parse.
 * @returns {string} A human readable format of the time elapsed.
 */
export const parseUptimeSeconds = (
  CONFIG: GlobalConfigInt,
  secondsString: string
): string => {
  try {
    const seconds = parseInt(secondsString);
    const days = seconds >= 86400 ? Math.floor(seconds / 86400) : 0;
    const hours =
      seconds >= 3600 ? Math.floor((seconds - days * 86400) / 3600) : 0;
    const minutes =
      seconds >= 60
        ? Math.floor((seconds - days * 86400 - hours * 3600) / 60)
        : 0;
    const secondsRemain = seconds - days * 86400 - hours * 3600 - minutes * 60;

    return `${days}d ${hours}h ${minutes}m ${secondsRemain}s`;
  } catch (err) {
    errorHandler(CONFIG, "uptime seconds parser", err);
    return "unknown";
  }
};
