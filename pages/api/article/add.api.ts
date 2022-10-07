import DataBase from '../../../components/back/database';
import runMiddleware from '../../../components/back/middleware/runMiddleware';

export default runMiddleware(middleware => {
  middleware.use((req, res, next) => {
    const { body = {} } = req;
    new DataBase()
      .query(`INSERT INTO article (title, content, authorId) VALUES ('${body.title}', '${body.content}', 1);`)
      .then((result) => {
        res.supply({ id: (result as { insertId?: string }).insertId });
      })
      .catch(error => {
       res.throw(error);
      })
      .finally(next)
  })
});
