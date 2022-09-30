import DataBase from '../../../components/back/database';
import runMiddleware from '../../../components/back/middleware/runMiddleware';

export default runMiddleware(middleware => {
  middleware.use((req, res, next) => {
    const { body = {} } = req;
    new DataBase()
      .query(`UPDATE article SET title = '${body.title}', content = '${body.content}' WHERE id = ${body.id};`)
      .then(result => {
        res.status(200).json({ status: 'success', id: body.id });
      })
      .catch(error => {
        res.status(500).json(error);
      })
      .finally(next);
  })
});
