import {
  getArticleList,
} from '../../../tools/request/modules/article';
import PageData from '../../../components/server/page-data';
import { ArticleListPageData, ArticleListLocaleEnum } from './list.interface';
import { IArticleListPageParams } from '../../../interface/request-response/article.interface';

const getArticleListPageData = PageData.tryToGetPageData<IArticleListPageParams, ArticleListPageData>(
  Object.values(ArticleListLocaleEnum),
  async (props, locale) => {
    let articleList;
    const translation = locale[ArticleListLocaleEnum.ArticleList];
    articleList = await getArticleList(props);
    return {
      props: {
        meta: {
          title: translation.title,
          keywords: translation.keywords,
        },
        pageData: articleList,
      },
    };
  }
);

export {
  getArticleListPageData
};
