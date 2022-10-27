import Middleware from './middleware';
import {
  ExtendedNextApiRequest,
  ExtendedNextApiResponse,
} from '../../../interface/request-response/base.interface';

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
