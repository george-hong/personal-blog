import DataBase from '../../../components/server/database';
import { runMiddleware } from '../../../components/server/middleware';
import { decodeQuotationMarks } from '../../../libs/base-type-utils';
import Validator from '../../../tools/validator';
import type { IArticleDetail } from '../../../interface/request-response/article.interface';

export default runMiddleware(middleware => {
  // TODO: Extract list logic.
  // TODO: Transfer the validator to a middleware.
  middleware.use((req, res, next) => {
    const { query = {} } = req;
    const validator = new Validator(query);
    const errorMessage = validator.validate({
      pageNumber: { min: 0 },
      pageSize: { min: 1 },
    });
    let condition;
    if (errorMessage) return res.throw(errorMessage);
    const { pageNumber, pageSize } = query;
    const realPageNumber = pageNumber === undefined ? 0 : Number(pageNumber);
    const realPageSize = pageSize === undefined ? 10 : Number(pageSize);
    if (query.authorId) condition = ` WHERE authorId = ${query.authorId}`;
    let sentence = `SELECT id, title, summary, views FROM article ${condition || ''} LIMIT ${realPageNumber * realPageSize}, ${realPageSize}`;
    const db = new DataBase();
    db
      .query<Array<IArticleDetail>>(sentence)
      .then(result => {
        return db.query<Array<{ 'COUNT(*)': number }>>('SELECT COUNT(*) FROM article')
          .then(countResult => {
            result = result.map(article => {
              article.title = decodeQuotationMarks(article.title, true);
              return article;
            });
            res.supply({
              count: countResult[0]['COUNT(*)'],
              data: result,
            });
          });
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
