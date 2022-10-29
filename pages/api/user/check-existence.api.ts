import DataBase from '../../../components/back/database';
import { runMiddleware } from '../../../components/back/middleware';
import { ExistenceCheckType } from '../../../interface/request-response/user.interface';

export default runMiddleware(middleware => {
  middleware.use((req, res, next) => {
    const { query = {} } = req;
    const { field, value } = query;
    if (!ExistenceCheckType[field as ExistenceCheckType]) res.throw('参数错误');
    new DataBase()
      .query(`SELECT id FROM user WHERE ${ field } = '${ value }';`)
      .then((result) => {
        const existence = !!(result as Array<object>).length;
        res.supply({ existence });
      })
      .catch(error => {
        res.throw(error);
      })
      .finally(next);
  });
});
