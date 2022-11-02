import {
  getArticleList,
} from '../../../tools/request/modules/article';
import PageData from '../../../components/back/page-data';
import { ArticleListPageData } from './list.interface';
import { IArticleListPageParams } from '../../../interface/request-response/article.interface';

const getArticleListPageData = PageData.tryToGetPageData<IArticleListPageParams, ArticleListPageData>(async (props) => {
  let articleList;
  articleList = await getArticleList(props);
  return {
    props: {
      meta: {
        title: '文章列表',
        keywords: '文章列表',
        description: articleList.slice(0, 3).map(article => article.title).join(';'),
      },
      pageData: articleList,
    },
  };
});

export {
  getArticleListPageData
};
