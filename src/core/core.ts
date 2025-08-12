import { BetaAnalyticsDataClient } from "@google-analytics/data";
import winston from "winston";

import { config, ServerConfig } from "../config/config";
import { CreateLogger } from "../logger/logger";

class GAservice {
  private config: ServerConfig;
  private logger: winston.Logger;
  private gaClient: BetaAnalyticsDataClient;

  constructor(config: ServerConfig, logger: winston.Logger) {
    this.config = config;
    this.logger = logger;
    this.gaClient = new BetaAnalyticsDataClient();
  }

  async RunReport(): Promise<Map<string, number>> {
    this.logger.info("Fetching report data from Google Analytics");

    const [response] = await this.gaClient.runReport({
      property: `properties/${this.config.reportId}`,
      dateRanges: [
        {
          startDate: process.env.START_DATE,
          endDate: "today"
        }
      ],
      dimensions: [
        {
          name: "pagePath"
        }
      ],
      metrics: [
        {
          name: "screenPageViews"
        }
      ]
    });

    const viewsMap = new Map<string, number>();
    if (response.rows) {
      for (const row of response.rows) {
        const key = row.dimensionValues![0].value!

        // convert the views to a number
        const views = parseInt(row.metricValues![0].value!, 10);

        let totalViews = 0;
        if (viewsMap.has(key)) {
          totalViews = viewsMap.get(key) || 0;
        }

        viewsMap.set(key, totalViews + views);
      }
    }

    return viewsMap;
  }
}

const gaService = new GAservice(config, CreateLogger("GAservice"));

export { gaService, GAservice };
