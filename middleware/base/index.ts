import type { NextApiRequest, NextApiResponse } from 'next';
import { NextFunction } from '../middleware.interface';

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
      next(true);
    }
    next();
  }
}

export default Base;
