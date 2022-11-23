import DataBase from '../../../components/server/database';
import { runMiddleware } from '../../../components/server/middleware';
import Validator from '../../../tools/validator';
import { IArticleDetail } from '../../../interface/request-response/article.interface';

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
      .query<Array<IArticleDetail>>(`SELECT a.id, a.title, a.content, a.authorId, a.createTime, a.updateTime, a.views, u.nickName, u.avatar FROM article a INNER JOIN user u ON a.authorId = u.id WHERE a.id = ${ query.id }`)
      .then(result => {
        const [articleDetail] = result;
        return new Promise((resolve, reject) => {
          db.query(`UPDATE article SET views = ${articleDetail.views + 1} WHERE id = ${ query.id }`)
            .then(() => resolve(articleDetail))
            .catch(reject);
        });
      })
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
