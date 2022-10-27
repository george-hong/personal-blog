import runMiddleware from '../../../../components/back/middleware/run-middleware';
import Secret from '../../../../tools/secret';

export default runMiddleware(middleware => {
  middleware.use((req, res, next) => {
    res.supply({
      content: Secret.RSAPublicKey,
    });
    next();
  });
});
