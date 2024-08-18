import Redis from "ioredis";
import winston from "winston";

import { CreateLogger } from "../logger/logger";
import { config } from "../config/config";

export interface Cache {
  get(key: string): Promise<string | null>;
  set(key: string, value: number): Promise<void>;
}

class CacheManager implements Cache {
  private redis;
  private logger: winston.Logger;
  private key: string;

  constructor(url: string, logger: winston.Logger) {
    this.key = "views";
    this.logger = logger;
    this.redis = new Redis(url);
  }

  async get(key: string): Promise<string | null> {
    this.logger.debug("Getting value from cache", { key });
    return await this.redis.hget(this.key, key);
  }

  async set(key: string, value: number): Promise<void> {
    this.logger.debug("Setting value in cache", { key, value });
    this.redis.hset(this.key, key, value);
  }
}

const cacheManager = new CacheManager(config.redis, CreateLogger("cache"));

export { cacheManager };
