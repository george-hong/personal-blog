import DataBase from '../../../components/server/database';
import { runMiddleware } from '../../../components/server/middleware';
import User from '../../../business/user/user';

export default runMiddleware(middleware => {
  middleware.use((req, res, next) => {
    const { body = {} } = req;
    const db = new DataBase();
    db
      .query(`SELECT id FROM user WHERE account = '${ body.account }';`)
      .then((result) => {
        const existence = !!(result as Array<object>).length;
        if (existence) throw('账号已存在');
        return db.query(`SELECT id FROM user WHERE account = '${ body.nickName }';`);
      })
      .then((result) => {
        const existence = !!(result as Array<object>).length;
        if (existence) throw('昵称已存在');
        const currentTimeStamp = Date.now();
        const realPassword = new User({
          account: body.account,
          password: body.password,
        }).getDecodedPassword();
        return db.query(`INSERT INTO user (account, password, nickName, privateKey, createTime) VALUES ('${ body.account }', '${ realPassword }', '${ body.nickName }', ${ currentTimeStamp }, ${ currentTimeStamp })`);
      })
      .then((result) => {
        res.supply({ id: (result as { insertId?: string }).insertId });
        next();
      })
      .catch(error => {
        res.throw(error);
        next();
      });
  });
});
