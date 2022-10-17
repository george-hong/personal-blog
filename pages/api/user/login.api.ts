import DataBase from '../../../components/back/database';
import runMiddleware from '../../../components/back/middleware/runMiddleware';
import { ILoginQueryResult } from '../../../interface/user.interface';
import jwt from 'jsonwebtoken';

export default runMiddleware(middleware => {
  middleware.use((req, res, next) => {
    const { body = {} } = req;
    const db = new DataBase();
    db
      .query<Array<ILoginQueryResult>>(`SELECT password, privateKey, id FROM user WHERE name = '${body.name}';`)
      .then((result) => {
        const matchedAccount = result[0];
        if (matchedAccount && matchedAccount.password === body.password) {
          const token = jwt.sign({ id: matchedAccount.id }, matchedAccount.privateKey, { expiresIn: '1h' });
          res.supply({
            token,
          });
          next();
        } else if (matchedAccount) {
          throw({ message: '密码不正确', field: 'password' });
        } else throw({ message: '账号不存在', field: 'name' });
      })
      .catch(error => {
        res.throw(error);
        next();
      })
  })
});
