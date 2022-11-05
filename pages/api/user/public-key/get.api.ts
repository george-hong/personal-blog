import { runMiddleware } from '../../../../components/server/middleware';
import Secret from '../../../../tools/secret';

export default runMiddleware(middleware => {
  middleware.use((req, res, next) => {
    res.supply({
      content: Secret.RSAPublicKey,
    });
    next();
  });
});
