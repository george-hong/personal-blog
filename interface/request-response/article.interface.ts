import {
  IRequestWithLocale,
  IResponseBase,
} from './base.interface';

export interface IArticleListPageParams extends IRequestWithLocale {
  query: {
    pageNo?: number;
    pageSize?: number;
    id?: number
  }
}

export interface IArticleListResponse extends IResponseBase {
  data: Array<IArticleDetail>;
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
  authorId: number;
  createTime: string;
  updateTime: string;
  nickName: string;
  avatar: string;
  views: number;
}

export interface IArticleDetailResponse extends IResponseBase {
  data: IArticleDetail;
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
