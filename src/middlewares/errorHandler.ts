import { Request, Response, NextFunction } from 'express';
import config from '../config/env';

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    message: err.message,
    ...(config.nodeEnv === 'DEVELOPMENT' && { stack: err.stack }),
  });
};

export default errorHandler;