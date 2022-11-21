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
  // TODO: Support paging.
  const { id: authorId } = props.query;
  const requestParams: { authorId?: number } = {};
  if (authorId !== undefined) requestParams.authorId = authorId;
  let result;
  result = await serverRequest.get<IArticleListResponse>(`/api/article/list`, requestParams);
  result = result.data;
  return result;
}

export async function getArticleDetail(props: IArticleDetailPageParams): Promise<IArticleDetail> {
  const id = props.query.id;
  let result;
  const requestParams: { id?: string } = {};
  if (id !== undefined) requestParams.id = id;
  result = await serverRequest.get<IArticleDetailResponse>(`/api/article/detail`, requestParams);
  result = result.data[0];
  return result;
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
