import type { NextApiRequest } from 'next';
import { NextFunction } from '../middleware.interface';
import { ExtendedNextApiResponse } from '../../../../interface/sever.interface';

const DEFAULT_ERROR_CODE = 503;
const DEFAULT_ERROR_MESSAGE = 'Internal error';

class Base {
  static setRequest(req: NextApiRequest, res: ExtendedNextApiResponse, next: NextFunction): void {
    res.supply = function (response: unknown) {
      res.status(200).json({
        status: 200,
        data: response,
      });
    }
    res.throw = function (messageOrProps, code?) {
      const errorCode = code ?? DEFAULT_ERROR_CODE;
      const responseProps = !messageOrProps ? {} :
        typeof messageOrProps === 'string' ? { message: messageOrProps } : messageOrProps;
      const { message, ...otherResponse } = responseProps;
      res.status(errorCode).json({
        ...otherResponse,
        message: message ?? DEFAULT_ERROR_MESSAGE,
        status: errorCode,
      });
    }
    next();
  }

  static allowCrossOrigin(req: NextApiRequest, res: ExtendedNextApiResponse, next: NextFunction): void {
    // allowed origins
    res.setHeader('Access-Control-Allow-Origin', '*');
    // allowed headers
    res.setHeader('Access-Control-Allow-Headers', 'content-type,token');
    // allowed methods
    res.setHeader('Access-Control-Allow-Methods', 'DELETE,PUT,POST,GET,OPTIONS');
    next();
  }

  static responseOptionsSpeedy(req: NextApiRequest, res: ExtendedNextApiResponse, next: NextFunction): void {
    if (req?.method?.toLowerCase() === 'options') {
      res.supply({ result: 'success' });
      return next();
    }
    next();
  }
}

export default Base;
