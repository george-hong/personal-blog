import Interceptor from './interceptor';

export type methodType =
  'get'
  | 'post';

export interface IRequestOptions {
  baseURL?: string;
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

export interface IInterceptorHandler<T> {
  (config: T): T;
}

export interface IInterceptors {
  request: Interceptor<RequestInit>;
  response: Interceptor<unknown>;
}
