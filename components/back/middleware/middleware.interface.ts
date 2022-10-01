import type { NextApiRequest, NextApiResponse } from 'next';
import Middleware from './index';

export interface NextFunction {
  (): void;
}

export interface MiddlewareHandler {
  (req: NextApiRequest, res: NextApiResponse, next: NextFunction): void;
}

export interface ConfigMiddleware {
  (middleware: Middleware): void;
}
