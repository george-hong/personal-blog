import type { NextApiRequest, NextApiResponse } from 'next'

class Base {
  static allowCrossOrigin(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    return new Promise((resolve) => {
      // allowed origins
      res.setHeader('Access-Control-Allow-Origin', '*');
      // allowed headers
      res.setHeader('Access-Control-Allow-Headers', 'content-type,token');
      // allowed methods
      res.setHeader('Access-Control-Allow-Methods', 'DELETE,PUT,POST,GET,OPTIONS');
      resolve();
    });
  }

  static responseOptionsSpeedy(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    return new Promise((resolve) => {
      console.log('req?.method', req);
      if (req?.method?.toLowerCase() === 'options') res.status(200).json({ result: 'success' });
      resolve()
    });
  }
}

export default Base;
