import winston from "winston";

const logger = winston.createLogger({
  level: "debug",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.simple(),
    winston.format.colorize(),
    winston.format.printf(({ timestamp, level, message, ...metadata }) => {
      let msg = `${timestamp} - ${level}: ${message}`;

      const meta = JSON.stringify(metadata);
      if (meta !== "{}") {
        msg += ` - ${meta}`;
      }

      return msg;
    })
  ),
  transports: [
    // new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.Console()
  ]
});

export { logger };
