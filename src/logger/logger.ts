import winston from "winston";

import { config } from "../config/config";

const CreateLogger = (meta: string): winston.Logger =>
  winston.createLogger({
    level: config.logLevel,
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
    defaultMeta: { service: meta },
    transports: [
      // new winston.transports.File({ filename: "error.log", level: "error" }),
      new winston.transports.Console()
    ]
  });

const GlobalLogger = CreateLogger("global");

export { GlobalLogger, CreateLogger };
