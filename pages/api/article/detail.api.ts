import DataBase from '../../../components/server/database';
import { runMiddleware } from '../../../components/server/middleware';

export default runMiddleware(middleware => {
  middleware.use((req, res, next) => {
    const { id } = req.query;
    new DataBase()
      .query(`SELECT a.id, a.title, a.content, a.authorId, a.createTime, a.updateTime, u.nickName, u.avatar FROM article a INNER JOIN user u ON a.authorId = u.id WHERE a.id = ${ id }`)
      .then(result => {
        res.supply(result);
      })
      .catch(error => {
        res.throw(error);
      })
      .finally(next);
  });
});
