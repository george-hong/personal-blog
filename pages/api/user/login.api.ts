import DataBase from '../../../components/back/database';
import runMiddleware from '../../../components/back/middleware/runMiddleware';
import { ILoginQueryResult } from '../../../interface/user.interface';
import Secret from '../../../tools/secret';

export default runMiddleware(middleware => {
  middleware.use((req, res, next) => {
    const { body = {} } = req;
    const db = new DataBase();
    db
      .query<Array<ILoginQueryResult>>(`SELECT password FROM user WHERE name = '${body.name}';`)
      .then((result) => {
        const matchedAccount = result[0];
        const decodeInfo = Secret.decode<string>(body.password);
        if (decodeInfo.success && matchedAccount && matchedAccount.password === decodeInfo.payload) {
          res.supply({
            token: 123
          });
          next();
        } else if (matchedAccount || !decodeInfo.success) {
          throw({ message: '密码不正确', field: 'password' });
        } else throw({ message: '账号不存在', field: 'name' });
      })
      .catch(error => {
        res.throw(error);
        next();
      })
  })
});
