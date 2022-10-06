import type { NextApiRequest, NextApiResponse } from 'next';
import { NextFunction } from '../middleware.interface';
import { ExtendedNextApiResponse } from '../../../../interface/sever.interface';

const DEFAULT_ERROR_CODE = 503;
const DEFAULT_ERROR_MESSAGE = 'Internal error';

class Base {
  static allowCrossOrigin(req: NextApiRequest, res: NextApiResponse, next: NextFunction): void {
    // allowed origins
    res.setHeader('Access-Control-Allow-Origin', '*');
    // allowed headers
    res.setHeader('Access-Control-Allow-Headers', 'content-type,token');
    // allowed methods
    res.setHeader('Access-Control-Allow-Methods', 'DELETE,PUT,POST,GET,OPTIONS');
    next();
  }

  static responseOptionsSpeedy(req: NextApiRequest, res: NextApiResponse, next: NextFunction): void {
    if (req?.method?.toLowerCase() === 'options') {
      res.status(200).json({ result: 'success' });
      next();
    }
    next();
  }

  static setRequest(req: NextApiRequest, res: NextApiResponse, next: NextFunction): void {
    // TODO: need to fix
    (res as ExtendedNextApiResponse).supply = function (response: unknown) {
      res.status(200).json({
        status: 200,
        data: response,
      });
    }
    (res as ExtendedNextApiResponse).throw = function (message?: string, code?: number) {
      const errorCode = code ?? DEFAULT_ERROR_CODE;
      res.status(errorCode).json({
        status: errorCode,
        data: message ?? DEFAULT_ERROR_MESSAGE,
      });
    }
    next();
  }
}

export default Base;
