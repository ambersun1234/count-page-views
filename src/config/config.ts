import dotenv from "dotenv";

dotenv.config();

type ServerConfig = {
  port: number;
  logLevel: string;
  cors: string[];
  redis: string;
  credentialPath: string;
  reportId: string;
  startDate: string;
};

const config = ReadConfig();

function ReadConfig(): ServerConfig {
  const cors = (process.env.CORS || "").split(",").map((item) => item.trim());

  return {
    port: Number(process.env.PORT) || 8888,
    logLevel: process.env.LOG_LEVEL || "info",
    cors: cors,
    redis: process.env.REDIS || "",
    credentialPath: process.env.GOOGLE_APPLICATION_CREDENTIALS || "",
    reportId: process.env.ID || "",
    startDate: process.env.START_DATE || ""
  };
}

export { config, ServerConfig };
