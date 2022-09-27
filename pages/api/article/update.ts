import DataBase from '../../../backComponents/database';
import useMiddleware from '../../../middleware/useMiddleware';

export default useMiddleware(middleware => {
  middleware.use((req, res, next) => {
    const { body = {} } = req;
    new DataBase()
      .query(`UPDATE article SET title = '${body.title}', content = '${body.content}' WHERE id = ${body.id};`)
      .then(result => {
        res.status(200).json({ status: 'success' });
      })
      .catch(error => {
        res.status(500).json(error);
      })
      .finally(next);
  })
});
