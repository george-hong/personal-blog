import {
  getArticleList,
} from '../../../tools/request/modules/article';
import { IPageBaseDataBeforeSend } from '../../../interface/request-response/base.interface';
import { ArticleListPageData } from './list.interface';
import { IArticleListPageParams } from '../../../interface/request-response/article.interface';

const getArticleListPageData = async (props: IArticleListPageParams): Promise<IPageBaseDataBeforeSend<ArticleListPageData>> => {
  let articleList;
  // TODO: refine error handle.
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
};

export { getArticleListPageData };
