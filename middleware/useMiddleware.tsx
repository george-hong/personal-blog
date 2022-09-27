import type { NextApiRequest, NextApiResponse } from 'next';
import Middleware from './index';
import { ConfigMiddleware } from './middleware.interface';
import Base from './base';

const useMiddleware = (configMiddleware: ConfigMiddleware) => {
  return async function (req: NextApiRequest, res: NextApiResponse,) {
    const middleware = new Middleware(req, res);
    middleware.use(Base.allowCrossOrigin);
    middleware.use(Base.responseOptionsSpeedy);
    configMiddleware(middleware);
    await middleware.run();
  }
};

export default useMiddleware;
