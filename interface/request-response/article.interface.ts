import { IResponseBase } from './base.interface';

export interface IArticleListPageParams {
  query: {
    pageNo?: number; pageSize?: number;
  }
}

export interface IArticleListResponse extends IResponseBase {
  data: Array<{
    id: number; title: string; content: string;
  }>;
}

export interface IArticleDetailPageParams {
  query: {
    id?: string;
  }
}

export interface IArticleDetailResponse extends IResponseBase {
  data: [
    {
      id: number; title: string; content: string;
    }
  ];
}

export interface IArticleAddParams {
  title: string;
  content: string;
}

export interface IArticleEditParams extends IArticleAddParams {
  id: number;
}

export interface IArticleEditResponse extends IResponseBase {
  data: {
    id: number;
  }
}
