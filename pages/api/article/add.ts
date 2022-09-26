import type { NextApiRequest, NextApiResponse } from 'next';
import DataBase from '../../../backComponents/database';
import BaseMiddleware from '../../../middleware/base';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await BaseMiddleware.allowCrossOrigin(req, res);
  await BaseMiddleware.responseOptionsSpeedy(req, res);
  const { body = {} } = req;
  new DataBase()
    .query(`INSERT INTO article (title, content, authorId) VALUES ('${body.title}', '${body.content}', 1);`)
    .then(result => {
      res.status(200).json({ status: 'success' });
    })
    .catch(error => {
      res.status(500).json(error);
    })
    .finally(() => {
      console.log('finally');
    })

}
