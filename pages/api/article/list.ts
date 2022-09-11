import type { NextApiRequest, NextApiResponse } from 'next'
import DataBase from '../../../backComponents/database';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = req.query.id;
  new DataBase()
    .query(`SELECT id, title, content FROM article`)
    .then(result => {
      res.status(200).json(result)
    })
    .catch(error => {
      res.status(500).json(error)
    })
}
