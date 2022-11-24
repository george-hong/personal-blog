import DataBase from '../../../components/server/database';
import { runMiddleware } from '../../../components/server/middleware';
import { decodeQuotationMarks } from '../../../libs/base-type-utils';
import type { IArticleDetail } from '../../../interface/request-response/article.interface';

export default runMiddleware(middleware => {
  middleware.use((req, res, next) => {
    const { query = {} } = req;
    let sentence = 'SELECT id, title, summary, views FROM article';
    if (query.authorId) sentence += ` WHERE authorId = ${query.authorId}`;
    const db = new DataBase();
    db
      .query<Array<IArticleDetail>>(sentence)
      .then(result => {
        result = result.map(article => {
          article.title = decodeQuotationMarks(article.title, true);
          return article;
        });
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
