import DataBase from '../../../components/back/database';
import runMiddleware from '../../../components/back/middleware/runMiddleware';

export default runMiddleware(middleware => {
  middleware.use((req, res, next) => {
    const { query = {} } = req;
    new DataBase()
      .query(`SELECT id FROM user WHERE name = '${query.name}';`)
      .then((result) => {
        const existence = !!(result as Array<object>).length;
        res.supply({ existence });
      })
      .catch(error => {
        res.throw(error);
      })
      .finally(next)
  })
});
