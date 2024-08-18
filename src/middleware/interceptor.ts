import { Request, Response, NextFunction } from "express";
import winston from "winston";
import { StatusCodes } from "http-status-codes";

import { CreateLogger } from "../logger/logger";

class Interceptor {
  private logger: winston.Logger;

  constructor(logger: winston.Logger) {
    this.logger = logger;
  }

  public LogRequest(req: Request, _res: Response, next: NextFunction) {
    this.logger.debug(`Incoming request`, {
      ip: req.ip,
      url: req.url,
      method: req.method,
      body: req.body
    });

    next();
  }

  public ErrorHandle(
    err: Error,
    req: Request,
    res: Response,
    _next: NextFunction
  ) {
    this.logger.error(`Error in request`, {
      ip: req.ip,
      url: req.url,
      method: req.method,
      body: req.body,
      error: err
    });

    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
  }
}

const interceptor = new Interceptor(CreateLogger("interceptor"));

export { interceptor };
