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
  IArticleListResponseDetail,
  IArticleListParams,
  IRecommendArticlesResponse,
  IRecommendArticlesResponseDetail,
} from '../../../interface/request-response/article.interface';

export async function getRecommendArticles(): Promise<IRecommendArticlesResponseDetail> {
  let result;
  result = await serverRequest.get<IRecommendArticlesResponse>(`/api/article/recommend`);
  result = result.data;
  return result;
}

export async function getArticleList(props: IArticleListPageParams): Promise<IArticleListResponseDetail> {
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
  result = result.data;
  return result;
}

export function requestToAddArticle(params: IArticleAddParams) {
  const { title, content } = params;
  const requestParams = {
    title,
    content,
  };
  return clientRequest.post<IArticleEditResponse>('/api/article/add', requestParams);
}

export function requestToEditArticle(params: IArticleEditParams) {
  const { title, content, id } = params;
  const requestParams = {
    title,
    content,
    id,
  };
  return clientRequest.post<IArticleEditResponse>('/api/article/update', requestParams);
}

export function requestToGetArticleList(params: IArticleListParams) {
  const { pageNumber, pageSize, id } = params;
  const requestParams = {
    pageNumber,
    pageSize,
    id,
  };
  return clientRequest.get<IArticleListResponse>('/api/article/list', requestParams);
}
