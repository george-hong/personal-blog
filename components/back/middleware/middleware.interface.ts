import Middleware from './index';
import {
  ExtendedNextApiRequest,
  ExtendedNextApiResponse,
} from '../../../interface/sever.interface';

export interface NextFunction {
  (): void;
}

export interface MiddlewareHandler {
  (req: ExtendedNextApiRequest, res: ExtendedNextApiResponse, next: NextFunction): void;
}

export interface ConfigMiddleware {
  (middleware: Middleware): void;
}

export interface ITokenParseResult {
  id: number;
}

export interface ITokenQueryInfo {
  privateKey: string;
}
