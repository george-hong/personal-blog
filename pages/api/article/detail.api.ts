import DataBase from '../../../components/server/database';
import { runMiddleware } from '../../../components/server/middleware';
import Validator from '../../../tools/validator';

export default runMiddleware(middleware => {
  middleware.use((req, res, next) => {
    const { query } = req;
    const validator = new Validator(query);
    const errorMessage = validator.validate({
      id: { isRequired: true },
    });
    if (errorMessage) return res.throw(errorMessage);
    const db = new DataBase();
    db
      .query(`SELECT a.id, a.title, a.content, a.authorId, a.createTime, a.updateTime, u.nickName, u.avatar FROM article a INNER JOIN user u ON a.authorId = u.id WHERE a.id = ${ query.id }`)
      .then(result => {
        res.supply(result);
      })
      .catch(error => {
        res.throw(error);
      })
      .finally(() => {
        db.dispose();
        next();
      });
  });
});
