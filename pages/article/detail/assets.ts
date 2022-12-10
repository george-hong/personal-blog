import { getArticleDetail } from '../../../tools/request/modules/article';
import PageData from '../../../components/server/page-data';
import {
  IArticleDetail,
  IArticleDetailPageParams,
} from '../../../interface/request-response/article.interface';
import { ArticleDetailLocaleEnum } from './detail.interface';
import { replaceTemplate } from '../../../libs/base-type-utils';

const getArticleDetailPageData = PageData.tryToGetPageData<IArticleDetailPageParams, IArticleDetail>(
  Object.values(ArticleDetailLocaleEnum),
  async (props, locale) => {
    let articleDetail;
    const translation = locale[ArticleDetailLocaleEnum.ArticleDetail];
    articleDetail = await getArticleDetail(props);
    return {
      props: {
        meta: {
          title: replaceTemplate(translation['页面标题'], { title: articleDetail.title }),
          // keywords: articleDetail.title,
          description: articleDetail.content.slice(0, 60),
        },
        pageData: articleDetail,
      },
    };
  }
);

export { getArticleDetailPageData };
