import Request from '../request';
import PROJECT_CONFIG from '../../../config/project';
import {
  IArticleListPageParams,
  IArticleDetailPageParams,
} from '../../../interface/article.interface';

const projectRequest = new Request({ baseURL: PROJECT_CONFIG.CLIENT_BASE_URL });

export async function getArticleList(props: IArticleListPageParams) {
  const { pageNo, pageSize } = props.query;
  let result;
  try {
    result = await projectRequest.get(`/api/article/list`);
    result = result.data;
  } catch (error) {
    result = error;
  }
  return { props: { pageData: result } };
}

export async function getArticleDetail(props: IArticleDetailPageParams) {
  const id = props.query.id;
  let result;
  const params: { id?: string } = {};
  if (id !== undefined) params.id = id;
  try {
    result = await projectRequest.get(`/api/article/detail`, params);
    result = result.data;
  } catch (error) {
    result = error;
  }
  return { props: { pageData: result[0] } };
}
