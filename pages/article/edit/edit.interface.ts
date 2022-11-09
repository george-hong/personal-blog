export interface IArticleEditPageData {
  id: number;
  title: string;
  content: string;
}

export interface IArticleInfo {
  id: number;
  content: string;
  title: string;
}

export enum ArticleEditLocaleEnum {
  ArticleEdit= 'article-edit',
}
