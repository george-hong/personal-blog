import DataBase from '../../../components/back/database';
import runMiddleware from '../../../components/back/middleware/run-middleware';

export default runMiddleware(middleware => {
  middleware.use((req, res, next) => {
    const { body = {}, userFromToken } = req;
    if (!userFromToken || userFromToken.id === undefined) return res.throw('请先登录');
    const db = new DataBase();
    db.query<Array<{ authorId: number }>>(`SELECT authorId FROM article WHERE id = ${ body.id }`)
      .then(result => {
        if (result[0] && result[0].authorId !== userFromToken.id) throw('没有权限，请确认文章归属。'); else return db.query(`UPDATE article SET title = '${ body.title }', content = '${ body.content }' WHERE id = ${ body.id };`);
      })
      .then(result => {
        res.supply({ id: body.id });
      })
      .catch(error => {
        res.throw(error);
      })
      .finally(next);
  });
});
