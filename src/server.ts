import express from "express";

import ViewRoutes from "./routes/views";
import { LogRequest } from "./middleware/interceptor";
import { logger } from "./logger/logger";
import { config } from "./config/config";

const app = express();

app.use(LogRequest);
app.use("/views", ViewRoutes);

app.listen(config.port, () => {
  logger.info(`Server is running`, { port: config.port });
});
