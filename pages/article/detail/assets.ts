import { getArticleDetail } from '../../../tools/request/modules/article';
import { IPageBaseDataBeforeSend } from '../../../interface/request-response/base.interface';
import {
  IArticleDetail,
  IArticleDetailPageParams,
} from '../../../interface/request-response/article.interface';

const getArticleDetailPageData = async (props: IArticleDetailPageParams): Promise<IPageBaseDataBeforeSend<IArticleDetail>> => {
  let articleDetail;
  // TODO: refine error handle.
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
};

export { getArticleDetailPageData };
