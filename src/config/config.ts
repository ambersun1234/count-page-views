import dotenv from "dotenv";

dotenv.config();

type ServerConfig = {
  port: number;
  logLevel: string;
  cors: string[];
  redis: string;
  credentialPath: string;
  reportId: string;
  domain: string;
  startDate: string;
};

const config = ReadConfig();

function ReadConfig(): ServerConfig {
  const corsList = process.env.CORS || "";
  const cors = corsList.split(",").map((item) => item.trim());

  return {
    port: Number(process.env.PORT) || 8888,
    logLevel: process.env.LOG_LEVEL || "info",
    cors: cors,
    redis: process.env.REDIS || "",
    credentialPath: process.env.GOOGLE_APPLICATION_CREDENTIALS || "",
    reportId: process.env.ID || "",
    domain: process.env.DOMAIN || "",
    startDate: process.env.START_DATE || ""
  };
}

export { config, ServerConfig };
