import pino from "pino";

const logger = pino({
  level: "info",
  prettyPrint: true,
});

export default logger;
