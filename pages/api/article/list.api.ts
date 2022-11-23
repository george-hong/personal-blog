import DataBase from '../../../components/server/database';
import { runMiddleware } from '../../../components/server/middleware';

export default runMiddleware(middleware => {
  middleware.use((req, res, next) => {
    const { query = {} } = req;
    let sentence = 'SELECT id, title, content, views FROM article';
    if (query.authorId) sentence += ` WHERE authorId = ${query.authorId}`;
    const db = new DataBase();
    db
      .query(sentence)
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
