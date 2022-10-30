import { IPageBaseDataBeforeSend } from '../../../interface/request-response/base.interface';
import {
  IArticleEditPageData,
  IArticleEditPageParams,
} from './edit.interface';
import { getArticleDetail } from '../../../tools/request/modules/article';

const getArticleEditPageData = async (props: IArticleEditPageParams): Promise<IPageBaseDataBeforeSend<IArticleEditPageData>> => {
  let pageData;
  const id = props.query.id;
  if (id) pageData = await getArticleDetail(props);


  return {
    props: {
      meta: {
        title: '文章编辑',
      },
      pageData,
    },
  };
};

export { getArticleEditPageData };
