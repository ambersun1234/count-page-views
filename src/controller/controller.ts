import { Request, Response, NextFunction } from "express";
import winston from "winston";
import { StatusCodes } from "http-status-codes";

import { CreateLogger } from "../logger/logger";
import { Cache, cacheManager } from "../cache/cache";
import { gaService, GAservice } from "../core/core";

class ViewController {
  private logger: winston.Logger;
  private cache: Cache;
  private ga: GAservice;

  constructor(logger: winston.Logger, cache: Cache, ga: GAservice) {
    this.logger = logger;
    this.cache = cache;
    this.ga = ga;
  }

  async GetViews(
    req: Request,
    res: Response,
    _next: NextFunction
  ): Promise<void> {
    this.logger.info("Getting views");

    const key = req.query.url;
    if (!key) {
      this.logger.info("Url not found in query params");
      res.status(StatusCodes.BAD_REQUEST).json({ error: "Url not found" });
      return;
    }

    const views = await this.cache.get(key as string);
    if (!views) {
      this.logger.error("Views not found in cache", { key });
      res.status(StatusCodes.NOT_FOUND).json({ error: "Views not found" });
      return;
    }

    this.logger.info("Views found in cache", { key, views });

    res.json({ views: parseInt(views) });
  }

  async CreateViews(
    _req: Request,
    res: Response,
    _next: NextFunction
  ): Promise<void> {
    this.logger.info("Creating views");

    const viewMap = await this.ga.RunReport();
    this.logger.info("Successfully fetched views from GA");
    for (const [url, views] of viewMap) {
      await this.cache.set(url, views);
    }

    this.logger.info("Views created", { total: viewMap.size });

    res.json({ message: "Views created" });
  }
}

const viewController = new ViewController(
  CreateLogger("view"),
  cacheManager,
  gaService
);

export { viewController };
