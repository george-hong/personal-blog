import DataBase from '../../../back-components/database';
import runMiddleware from '../../../middleware/runMiddleware';

export default runMiddleware(middleware => {
  middleware.use((req, res, next) => {
    new DataBase()
      .query(`SELECT id, title, content FROM article`)
      .then(result => {
        res.status(200).json(result)
      })
      .catch(error => {
        res.status(500).json(error)
      })
      .finally(next)
  })
});
