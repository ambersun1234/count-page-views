import { Request, Response, NextFunction } from 'express';
import { logger } from '../logger/logger';

function LogRequest(req: Request, res: Response, next: NextFunction) {
  logger.debug(`Incoming request`, {ip: req.ip, url: req.url, method: req.method, body: req.body});
  
  next();
}

export { LogRequest };
