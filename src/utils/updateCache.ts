import { ActivityCache } from "../interfaces/ActivityCache";
import { GlobalConfigInt } from "../interfaces/GlobalConfigInt";

/**
 * Utility to update the cache of Naomi's activities.
 *
 * @param {GlobalConfigInt} CONFIG The global config object.
 * @param {ActivityCache} cache The item to add to the cache.
 */
export const updateCache = (CONFIG: GlobalConfigInt, cache: ActivityCache) => {
  CONFIG.activityCache.unshift(cache);
  if (CONFIG.activityCache.length > 10) {
    CONFIG.activityCache = CONFIG.activityCache.slice(0, 10);
  }
};
