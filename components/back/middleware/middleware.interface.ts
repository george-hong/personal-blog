import type { NextApiRequest } from 'next';
import Middleware from './index';
import { ExtendedNextApiResponse } from '../../../interface/sever.interface';

export interface NextFunction {
  (): void;
}

export interface MiddlewareHandler {
  (req: NextApiRequest, res: ExtendedNextApiResponse, next: NextFunction): void;
}

export interface ConfigMiddleware {
  (middleware: Middleware): void;
}
