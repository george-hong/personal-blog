import type { NextApiRequest, NextApiResponse } from 'next'
import DataBase from '../../../backComponents/database';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  new DataBase()
    .query(`SELECT * FROM article WHERE id = ${id}`)
    .then(result => {
      res.status(200).json(result)
    })
    .catch(error => {
      res.status(500).json(error)
    })
}
