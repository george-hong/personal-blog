import type { NextApiRequest } from 'next';
import Middleware from './index';
import { ConfigMiddleware } from './middleware.interface';
import Base from './base';
import { ExtendedNextApiResponse } from '../../../interface/sever.interface';

const runMiddleware = (configMiddleware: ConfigMiddleware) => {
  return async function (req: NextApiRequest, res: ExtendedNextApiResponse) {
    const middleware = new Middleware(req, res);
    // Use common middleware.
    middleware.use(Base.setRequest);
    middleware.use(Base.allowCrossOrigin);
    middleware.use(Base.responseOptionsSpeedy);
    // Use business middleware.
    configMiddleware(middleware);
    // Run all middleware.
    await middleware.run();
  }
};

export default runMiddleware;
