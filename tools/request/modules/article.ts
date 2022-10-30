import {
  clientRequest,
  serverRequest,
} from '../index';
import {
  IArticleListPageParams,
  IArticleDetailPageParams,
  IArticleListResponse,
  IArticleDetailResponse,
  IArticleAddParams,
  IArticleEditParams,
  IArticleEditResponse,
  IArticleDetail,
} from '../../../interface/request-response/article.interface';
import { encodeQuotationMarks } from '../../methods';

export async function getArticleList(props: IArticleListPageParams): Promise<Array<IArticleDetail>> {
  const { pageNo, pageSize } = props.query;
  let result;
  result = await serverRequest.get<IArticleListResponse>(`/api/article/list`);
  result = result.data;
  // TODO: add try catch and fix types;
  // @ts-ignore
  return result;
}

export async function getArticleDetail(props: IArticleDetailPageParams): Promise<IArticleDetail> {
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
  // TODO: fix types;
  // @ts-ignore
  return error || result;
}

export function requestToAddArticle(params: IArticleAddParams) {
  const { title, content } = params;
  const requestParams = {
    title,
    content: encodeQuotationMarks(content),
  };
  return clientRequest.post<IArticleEditResponse>('/api/article/add', requestParams);
}

export function requestToEditArticle(params: IArticleEditParams) {
  const { title, content, id } = params;
  const requestParams = {
    title,
    content: encodeQuotationMarks(content),
    id,
  };
  return clientRequest.post<IArticleEditResponse>('/api/article/update', requestParams);
}
