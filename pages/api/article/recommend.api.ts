import DataBase from '../../../components/server/database';
import { runMiddleware } from '../../../components/server/middleware';
import type { IArticleDetail } from '../../../interface/request-response/article.interface';

export default runMiddleware(middleware => {
  // TODO: Extract list logic.
  middleware.use((req, res, next) => {
    let sentence = `SELECT id, title, summary, views FROM article ORDER BY views DESC LIMIT 0, 3`;
    const db = new DataBase();
    db
      .query<Array<IArticleDetail>>(sentence)
      .then(result => {
        res.supply({
          mostViews: result,
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
