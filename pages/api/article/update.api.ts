import DataBase from '../../../components/server/database';
import { runMiddleware } from '../../../components/server/middleware';
import { UserForServer } from '../../../business/user';
import Validator from '../../../tools/validator';
import { encodeQuotationMarks } from '../../../libs/base-type-utils';
import { getArticleSummary } from '../../../business/article';
import { ServiceError } from '../../../interface/base.interface';
import type { IUserFromToken } from '../../../interface/request-response/base.interface';

export default runMiddleware(middleware => {
  middleware.use((req, res, next) => {
    const { body = {}, userFromToken } = req;
    if (UserForServer.warningIfNotLogin(req, res)) return;
    const validator = new Validator(body);
    const errorMessage = validator.validate({
      title: { isRequired: true },
      content: { isRequired: true },
      id: { isRequired: true },
    });
    if (errorMessage) return res.throw(errorMessage);
    const title = encodeQuotationMarks(body.title, true);
    const content = encodeQuotationMarks(body.content, true);
    const summary = getArticleSummary(body.content);
    const db = new DataBase();
    db
      .query<Array<{ authorId: number }>>(`SELECT authorId FROM article WHERE id = ${ body.id }`)
      .then(result => {
        if (!result[0]) throw(ServiceError.articleNotExist);
        if (result[0].authorId !== (userFromToken as IUserFromToken).id) throw(ServiceError.noAuthenticPleaseCheckBelong);
        else return db.query(`UPDATE article SET title = '${ title }', content = '${ content }', summary = '${summary}' WHERE id = ${ body.id };`);
      })
      .then(result => {
        res.supply({ id: body.id });
      })
      .catch(error => {
        res.throw(error);
      })
      .finally(() => {
        db.dispose();
        next();
      });
  });
});
