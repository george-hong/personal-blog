import DataBase from '../../../back-components/database';
import runMiddleware from '../../../middleware/runMiddleware';

export default runMiddleware(middleware => {
  middleware.use((req, res, next) => {
    const { body = {} } = req;
    new DataBase()
      .query(`INSERT INTO article (title, content, authorId) VALUES ('${body.title}', '${body.content}', 1);`)
      .then((result) => {
        res.status(200).json({ status: 'success', id: (result as { insertId?: string }).insertId });
      })
      .catch(error => {
        res.status(500).json(error);
      })
      .finally(next)
  })
});
