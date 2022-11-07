import DataBase from '../../../components/server/database';
import { runMiddleware } from '../../../components/server/middleware';
import { ISignInQueryResult } from '../../../interface/request-response/user.interface';
import { UserForServer } from '../../../business/user';
import Secret, {
  SecretType,
} from '../../../tools/secret';

export default runMiddleware(middleware => {
  middleware.use((req, res, next) => {
    const { body = {} } = req;
    const db = new DataBase();
    db
      .query<Array<ISignInQueryResult>>(`SELECT password, privateKey, nickName, avatar, id FROM user WHERE account = '${ body.account }';`)
      .then((result) => {
        const matchedAccount = result[0];
        const decodeResult = Secret.decode(body.password, { type: SecretType.RSA });
        if (matchedAccount && decodeResult.success && matchedAccount.password === decodeResult.payload) {
          const userInfo = UserForServer.generateUserInfoBySignInResult(matchedAccount);
          res.supply(userInfo);
          next();
        } else if (matchedAccount) {
          throw({
            message: '密码不正确',
            field: 'password',
          });
        } else throw({
          message: '账号不存在',
          field: 'account',
        });
      })
      .catch(error => {
        res.throw(error);
        next();
      });
  });
});
