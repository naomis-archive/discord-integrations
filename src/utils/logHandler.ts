import { createLogger, format, transports, config } from "winston";

const { combine, timestamp, colorize, printf } = format;

/**
 * Custom log handler, using Winston to format and print messages
 * to the terminal.
 */
export const logHandler = createLogger({
  levels: config.npm.levels,
  level: "silly",
  transports: [new transports.Console()],
  format: combine(
    timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    colorize(),
    printf((info) => `${info.level}: ${[info.timestamp]}: ${info.message}`)
  ),
  exitOnError: false,
});
