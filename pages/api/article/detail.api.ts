import DataBase from '../../../components/server/database';
import { runMiddleware } from '../../../components/server/middleware';

export default runMiddleware(middleware => {
  middleware.use((req, res, next) => {
    const { id } = req.query;
    new DataBase()
      .query(`SELECT * FROM article WHERE id = ${ id }`)
      .then(result => {
        res.supply(result);
      })
      .catch(error => {
        res.throw(error);
      })
      .finally(next);
  });
});
