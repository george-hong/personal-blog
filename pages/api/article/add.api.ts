import DataBase from '../../../components/server/database';
import { runMiddleware } from '../../../components/server/middleware';
import { timeStampFromJsToDb } from '../../../libs/time-utils';
import { UserForServer } from '../../../business/user';
import Validator from '../../../tools/validator';
import { encodeQuotationMarks } from '../../../libs/base-type-utils';
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
    });
    if (errorMessage) return res.throw(errorMessage);
    const title = encodeQuotationMarks(body.title, true);
    const content = encodeQuotationMarks(body.content, true);
    const db = new DataBase();
    db
      .query<Array<object>>(`SELECT id FROM article WHERE title = '${ title }'`)
      .then(result => {
        const existence = !!result.length;
        if (existence) throw(ServiceError.articleTitleExist);
        return db.query(`INSERT INTO article (title, content, authorId, createTime) VALUES ('${ title }', '${ content }', ${ (userFromToken as IUserFromToken).id }, '${ timeStampFromJsToDb() }');`)
      })
      .then((result) => {
        res.supply({ id: (result as { insertId?: string }).insertId });
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
