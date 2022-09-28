export interface IArticleListPageParams {
  query: {
    pageNo?: number;
    pageSize?: number;
  }
}

export interface IArticleDetailPageParams {
  query: {
    id?: string;
  }
}
