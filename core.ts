import dotenv from "dotenv";
import { BetaAnalyticsDataClient } from "@google-analytics/data";
import { curly } from "node-libcurl";
import { StatusCodes } from "http-status-codes";

dotenv.config();

const domain = process.env.DOMAIN;
const propertyId = process.env.ID;
const analyticsDataClient = new BetaAnalyticsDataClient();

async function GetUrl(url: string): Promise<string> {
  // remove query params from the url
  url = url.split("?")[0];
  url = encodeURI(url);

  let redirectedUrl = url;

  try {
    const { statusCode, data } = await curly.get(url, {
      followLocation: true
    });
    // if data contain "http-equiv="refresh", extract the new url
    if (
      statusCode === StatusCodes.OK &&
      data.includes('http-equiv="refresh"')
    ) {
      const match = data.match(/url=(.+)">/);
      if (match) {
        redirectedUrl = match[1];
      }
    }
  } catch (error) {
    console.error(error);
  }

  return redirectedUrl
    .replace(domain!, "")
    .replace("https://", "")
    .replace("http://", "");
}

async function RunReport(): Promise<Map<string, number>> {
  const [response] = await analyticsDataClient.runReport({
    property: `properties/${propertyId}`,
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
      const key = await GetUrl(row.dimensionValues![0].value!);

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

export { RunReport };
