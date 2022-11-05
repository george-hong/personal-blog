import {
  IRequestWithLocale,
  IResponseBase,
} from './base.interface';

export interface IArticleListPageParams extends IRequestWithLocale {
  query: {
    pageNo?: number; pageSize?: number;
  }
}

export interface IArticleListResponse extends IResponseBase {
  data: Array<{
    id: number; title: string; content: string;
  }>;
}

export interface IArticleDetailPageParams extends IRequestWithLocale {
  query: {
    id?: string;
  }
}

export interface IArticleEditPageParams extends IRequestWithLocale {
  query: {
    id?: string;
  }
}


export interface IArticleDetail {
  id: number;
  title: string;
  content: string;
}

export interface IArticleDetailResponse extends IResponseBase {
  data: Array<IArticleDetail>;
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
