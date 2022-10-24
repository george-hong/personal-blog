import Middleware from './index';
import { ConfigMiddleware } from './middleware.interface';
import Base from './base';
import {
  ExtendedNextApiRequest,
  ExtendedNextApiResponse,
} from '../../../interface/sever.interface';

const runMiddleware = (configMiddleware: ConfigMiddleware) => {
  return async function (req: ExtendedNextApiRequest, res: ExtendedNextApiResponse) {
    const middleware = new Middleware(req, res);
    // Use common middleware.
    middleware.use(Base.responseOptionsSpeedy);
    middleware.use(Base.setRequest);
    middleware.use(Base.allowCrossOrigin);
    middleware.use(Base.parseUserFromToken);
    // Use business middleware.
    configMiddleware(middleware);
    // Run all middleware.
    await middleware.run();
  }
};

export default runMiddleware;
