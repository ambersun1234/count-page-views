import dotenv from "dotenv";

import { ServerConfig } from "./type";

dotenv.config();

const config = ReadConfig();

function ReadConfig(): ServerConfig {
  return {
    port: Number(process.env.PORT) || 8888,
    credentialPath: process.env.GOOGLE_APPLICATION_CREDENTIALS || "",
    reportId: process.env.ID || "",
    domain: process.env.DOMAIN || "",
    startDate: process.env.START_DATE || ""
  };
}

export { config };
