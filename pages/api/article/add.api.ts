import DataBase from '../../../components/back/database';
import runMiddleware from '../../../components/back/middleware/runMiddleware';
import { timeStampFromJsToDb } from '../../../libs/time-util';

export default runMiddleware(middleware => {
  middleware.use((req, res, next) => {
    const { body = {}, userFromToken } = req;
    if (!userFromToken || userFromToken.id === undefined) return res.throw('请先登录');
    new DataBase()
      .query(`INSERT INTO article (title, content, authorId, createTime) VALUES ('${body.title}', '${body.content}', ${userFromToken.id}, '${timeStampFromJsToDb()}');`)
      .then((result) => {
        res.supply({ id: (result as { insertId?: string }).insertId });
      })
      .catch(error => {
       res.throw(error);
      })
      .finally(next)
  })
});
