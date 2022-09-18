import type { NextApiRequest, NextApiResponse } from 'next'
import DataBase from '../../../backComponents/database';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req?.method?.toLowerCase() !== 'post') return res.status(404);
  const { body = {} } = req;
  console.log('body', body);
  new DataBase()
    .query(`UPDATE article SET title = '${body.title}', content = '${body.content}' WHERE id = ${body.id};`)
    .then(result => {
      res.status(200).json({ status: 'success' });
    })
    .catch(error => {
      res.status(500).json(error);
    })

}
