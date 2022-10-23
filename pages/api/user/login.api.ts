import DataBase from '../../../components/back/database';
import runMiddleware from '../../../components/back/middleware/runMiddleware';
import { ILoginQueryResult } from '../../../interface/user.interface';
import jwt from 'jsonwebtoken';
import Secret from '../../../tools/secret';
import { SecretType } from '../../../interface/tool.interface';

export default runMiddleware(middleware => {
  middleware.use((req, res, next) => {
    const { body = {} } = req;
    const db = new DataBase();
    db
      .query<Array<ILoginQueryResult>>(`SELECT password, privateKey, nickName, avatar, id FROM user WHERE account = '${body.account}';`)
      .then((result) => {
        const matchedAccount = result[0];
        const decodeResult = Secret.decode(body.password, { type: SecretType.RSA });
        if (matchedAccount && decodeResult.success && matchedAccount.password === decodeResult.payload) {
          const token = jwt.sign({ id: matchedAccount.id }, matchedAccount.privateKey, { expiresIn: '1h' });
          res.supply({
            token,
            nickName: matchedAccount.nickName,
            avatar: matchedAccount.avatar || '',
          });
          next();
        } else if (matchedAccount) {
          throw({ message: '密码不正确', field: 'password' });
        } else throw({ message: '账号不存在', field: 'account' });
      })
      .catch(error => {
        res.throw(error);
        next();
      })
  })
});
