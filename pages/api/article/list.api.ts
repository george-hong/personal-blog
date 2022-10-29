import DataBase from '../../../components/back/database';
import { runMiddleware } from '../../../components/back/middleware';

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
