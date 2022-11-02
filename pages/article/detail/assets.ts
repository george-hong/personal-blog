import { getArticleDetail } from '../../../tools/request/modules/article';
import PageData from '../../../components/back/page-data';
import {
  IArticleDetail,
  IArticleDetailPageParams,
} from '../../../interface/request-response/article.interface';

const getArticleDetailPageData = PageData.tryToGetPageData<IArticleDetailPageParams, IArticleDetail>(async (props) => {
  let articleDetail;
  articleDetail = await getArticleDetail(props);
  return {
    props: {
      meta: {
        title: articleDetail.title,
        keywords: articleDetail.title,
        description: articleDetail.content.slice(0, 60),
      },
      pageData: articleDetail,
    },
  };
});

export { getArticleDetailPageData };
