export interface IPageDataTryResult<T> {
  props: {
    meta: {
      title: string;
      keywords?: string;
      description?: string
    },
    pageData?: T;
  }
}
