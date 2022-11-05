import DataBase from '../../../components/server/database';
import { runMiddleware } from '../../../components/server/middleware';

export default runMiddleware(middleware => {
  middleware.use((req, res, next) => {
    new DataBase()
      .query(`SELECT id, title, content FROM article`)
      .then(result => {
        res.supply(result);
      })
      .catch(error => {
        res.throw(error);
      })
      .finally(next);
  });
});
