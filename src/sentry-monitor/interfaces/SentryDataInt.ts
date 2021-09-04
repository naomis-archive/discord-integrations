/* eslint-disable camelcase */
/**
 * This represents an error object from Sentry.
 */
export interface SentryDataInt {
  id: string;
  project: string;
  project_name: string;
  project_slug: string;
  logger: string | null;
  level: string;
  culprit: string;
  message: string;
  url: string;
  triggering_rules: unknown[];
  event: Record<string, unknown>;
}
