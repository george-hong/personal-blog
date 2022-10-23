import DataBase from '../../../components/back/database';
import runMiddleware from '../../../components/back/middleware/runMiddleware';
import User from '../../../libs/user';

export default runMiddleware(middleware => {
  middleware.use((req, res, next) => {
    const { body = {} } = req;
    const db = new DataBase();
    db
      .query(`SELECT id FROM user WHERE account = '${body.account}';`)
      .then((result) => {
        const existence = !!(result as Array<object>).length;
        if (existence) throw('账号已存在');
        const currentTimeStamp = Date.now();
        const realPassword = new User({ account: body.account, password: body.password }).getDecodedPassword();
        return db.query(`INSERT INTO user (account, password, privateKey, createTime) VALUES ('${body.account}', '${realPassword}', ${currentTimeStamp}, ${currentTimeStamp})`);
      })
      .then((result) => {
        res.supply({ id: (result as { insertId?: string }).insertId });
        next();
      })
      .catch(error => {
        res.throw(error);
        next();
      });
  })
});
