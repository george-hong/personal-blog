import { IPageBaseDataBeforeSend } from '../../../interface/request-response/base.interface';
import {
  IArticleEditPageData,
  IArticleEditPageParams,
} from './edit.interface';
import { getArticleDetail } from '../../../tools/request/modules/article';

const getArticleEditPageData = async (props: IArticleEditPageParams): Promise<IPageBaseDataBeforeSend<IArticleEditPageData>> => {
  const id = props.query.id;
  const result: IPageBaseDataBeforeSend<IArticleEditPageData> = {
    props: {
      meta: {
        title: '文章编辑',
      },
    },
  }
  if (id) result.props.pageData = await getArticleDetail(props);
  return result;
};

export { getArticleEditPageData };
