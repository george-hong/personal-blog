import { serverRequest } from '../index';
import {
  IArticleListPageParams,
  IArticleDetailPageParams,
  IArticleListResponse,
  IArticleDetailResponse,
} from '../../../interface/article.interface';

export async function getArticleList(props: IArticleListPageParams) {
  const { pageNo, pageSize } = props.query;
  let result;
  try {
    result = await serverRequest.get<IArticleListResponse>(`/api/article/list`);
    result = result.data;
  } catch (error) {
    result = error;
  }
  return { props: { pageData: result } };
}

export async function getArticleDetail(props: IArticleDetailPageParams) {
  const id = props.query.id;
  let result;
  let error;
  const params: { id?: string } = {};
  if (id !== undefined) params.id = id;
  try {
    result = await serverRequest.get<IArticleDetailResponse>(`/api/article/detail`, params);
    result = result.data[0];
  } catch (err) {
    error = err;
  }
  return { props: { pageData: error || result } };
}
