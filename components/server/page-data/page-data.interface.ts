import type { GetServerSideProps as GetNextServerSideProps } from 'next';

export interface IPageDataTryResult<T> {
  props: {
    meta: {
      title: string;
      keywords?: string;
      description?: string
    },
    pageData?: T;
    error?: unknown;
  }
}

export interface IPageBase {
  locale?: string;
}

export type TranslationModules = Array<string>;

export interface ILocale {
  [moduleName: string]: { [field: string]: string }
}
