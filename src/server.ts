import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import ViewRoutes from "./routes/views";
import { interceptor } from "./middleware/interceptor";
import { GlobalLogger } from "./logger/logger";
import { config } from "./config/config";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: config.cors
  })
);
app.use(interceptor.LogRequest.bind(interceptor));
app.use(interceptor.ErrorHandle.bind(interceptor));
app.use("/views", ViewRoutes);

app.listen(config.port, () => {
  GlobalLogger.info(`Server is running`, { port: config.port });
  GlobalLogger.debug(`CORS enable for ${config.cors}`);
});
