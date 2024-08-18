import { BetaAnalyticsDataClient } from "@google-analytics/data";
import { StatusCodes } from "http-status-codes";
import winston from "winston";
import https from "https";

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

  async GetUrl(url: string): Promise<string> {
    // remove query params from the url
    url = url.split("?")[0];
    url = encodeURI(url);

    let redirectedUrl = "";

    try {
      redirectedUrl = await new Promise<string>((resolve, _reject) => {
        https.get("https://" + url, (res) => {
          let body = "";

          res.on("data", (chunk) => {
            body += chunk;
          });

          res.on("end", () => {
            if (
              res.statusCode === StatusCodes.OK &&
              body.includes('http-equiv="refresh"')
            ) {
              const match = body.match(/url=(.+)">/);
              this.logger.warn("Redirected url found", {
                url,
                newUrl: match![1]
              });

              if (match) {
                redirectedUrl = match[1];
                resolve(redirectedUrl);
              }
            } else {
              resolve(url);
            }
          });
        });
      });
    } catch (error) {
      this.logger.error("Error fetching url", { url, error });
    }

    return redirectedUrl
      .replace(this.config.domain!, "")
      .replace("https://", "")
      .replace("http://", "");
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
          name: "fullPageUrl"
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
        // test url needs to be redirect or not
        const key = await this.GetUrl(row.dimensionValues![0].value!);

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
