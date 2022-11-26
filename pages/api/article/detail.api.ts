import DataBase from '../../../components/server/database';
import { runMiddleware } from '../../../components/server/middleware';
import Validator from '../../../tools/validator';
import { decodeQuotationMarks } from '../../../libs/base-type-utils';
import type { IArticleDetail } from '../../../interface/request-response/article.interface';
import { timeFromDbToJs } from '../../../libs/time-utils';

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
        return new Promise<IArticleDetail>((resolve, reject) => {
          db.query(`UPDATE article SET views = ${articleDetail.views + 1} WHERE id = ${ query.id }`)
            .then(() => resolve(articleDetail))
            .catch(reject);
        });
      })
      .then(result => {
        if (result) {
          result.title = decodeQuotationMarks(result.title, true);
          result.content = decodeQuotationMarks(result.content, true);
          result.createTime = timeFromDbToJs(result.createTime);
          result.updateTime = timeFromDbToJs(result.updateTime);
        }
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
