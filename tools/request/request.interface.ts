export type methodType =
  'get'
  | 'post';

export interface IRequestOptions {
  baseURL?: string;
  beforeSend?: (fetchOptions: RequestInit) => RequestInit;
}

export interface IParams {
  [key: string]: number | string | boolean | undefined;
}

export interface IConfig {
  headers?: { [key: string]: string };
}

export interface IURLAndParams {
  url: string;
  params?: IParams | string;
}
