export interface IArticleEditPageData {
  id: number;
  title: string;
  content: string;
}

export interface IArticleEditPageParams {
  query: {
    id?: string;
  }
}

export interface IArticleInfo {
  id: number;
  content: string;
  title: string;
}
