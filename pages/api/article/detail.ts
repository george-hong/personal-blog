import type { NextApiRequest, NextApiResponse } from 'next'
import DataBase from '../../../back-components/database';
import BaseMiddleware from '../../../middleware/base';
import runMiddleware from '../../../middleware/runMiddleware';

export default runMiddleware(middleware => {
  middleware.use((req, res, next) => {
    const { id } = req.query;
    new DataBase()
      .query(`SELECT * FROM article WHERE id = ${id}`)
      .then(result => {
        res.status(200).json(result)
      })
      .catch(error => {
        res.status(500).json(error)
      })
      .finally(next);
  })
});
