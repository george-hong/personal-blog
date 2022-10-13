import DataBase from '../../../components/back/database';
import runMiddleware from '../../../components/back/middleware/runMiddleware';

export default runMiddleware(middleware => {
  middleware.use((req, res, next) => {
    const { body = {} } = req;
    const db = new DataBase();
    db
      .query(`SELECT id FROM user WHERE name = '${body.name}';`)
      .then((result) => {
        const existence = !!(result as Array<object>).length;
        if (existence) throw('账号已存在');
        return db.query(`INSERT INTO user (name, password, createTime) VALUES ('${body.name}', '${body.password}', ${Date.now()})`);
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
