import { IPageBaseDataBeforeSend } from '../../../interface/request-response/base.interface';
import PageData from '../../../components/server/page-data';
import { getArticleDetail } from '../../../tools/request/modules/article';
import {
  IArticleEditPageData,
  ArticleEditLocaleEnum,
} from './edit.interface';
import { IArticleEditPageParams } from '../../../interface/request-response/article.interface';

const getArticleEditPageData = PageData.tryToGetPageData<IArticleEditPageParams, IArticleEditPageData>(
  Object.values(ArticleEditLocaleEnum),
  async (props, locale ) => {
  const id = props.query.id;
  const translation = locale[ArticleEditLocaleEnum.ArticleEdit];
  const result: IPageBaseDataBeforeSend<IArticleEditPageData> = {
    props: {
      meta: {
        title: translation.title,
        keywords: translation.keywords,
      },
    },
  }
  if (id) result.props.pageData = await getArticleDetail(props);
  return result;
});

export { getArticleEditPageData };
