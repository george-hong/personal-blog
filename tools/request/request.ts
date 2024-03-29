import { filterObjectKeys } from '../../libs/object-util';
import {
  IConfig,
  IInterceptors,
  IParams,
  IRequestOptions,
  IURLAndParams,
  methodType,
} from './request.interface';
import Interceptor from './interceptor';

const CONNECTOR_OF_GET = '?';
const CONNECTOR_OF_KEY_VALUE = '=';
const CONNECTOR_OF_PARAMS = '&';
const ABSOLUTE_PREFIX = [
  'http://',
  'https://',
];

class Request {
  /**
   * Check url is absolute.
   * @param {string} url - URL for check.
   * @return {boolean} Is absolute URL.
   */
  static isAbsoluteURL(url: string): boolean {
    let isAbsolute = false;
    if (url && ABSOLUTE_PREFIX.some(prefix => url.startsWith(prefix))) isAbsolute = true;
    return isAbsolute;
  }

  readonly options: IRequestOptions;
  public interceptors: IInterceptors;

  constructor(options: IRequestOptions = {}) {
    this.options = options;
    this.interceptors = {
      request: new Interceptor(),
      response: new Interceptor(),
    }
  }

  private serializeParams(params: IParams): string {
    return Object.entries(params)
                 .map(keyAndValue => keyAndValue.join(CONNECTOR_OF_KEY_VALUE))
                 .join(CONNECTOR_OF_PARAMS);
  }

  private getUrlAndParamsByMethod(method: methodType, url: string, params?: IParams): IURLAndParams {
    const { baseURL } = this.options;
    const result: IURLAndParams = { url: (baseURL && !Request.isAbsoluteURL(url)) ? baseURL + url : url };
    if (params) params = filterObjectKeys(params, (key, value) => value !== undefined);
    if (method === 'get' && params) {
      const connector = url.endsWith(CONNECTOR_OF_GET) ? '' :
        url.includes(CONNECTOR_OF_GET) ? CONNECTOR_OF_PARAMS : CONNECTOR_OF_GET;
      result.url += `${ connector }${ this.serializeParams(params) }`;
    } else if (method === 'post' && params) {
      result.params = JSON.stringify(params);
    }
    return result;
  }

  private send<T>(method: methodType, url: string, params?: IParams, config: IConfig = {}): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      const { url: urlParsed, params: paramsParsed } = this.getUrlAndParamsByMethod(method, url, params);
      const headers = {
        'Content-Type': 'application/json', ...config?.headers,
      };
      const fetchOptions: RequestInit = {
        method: method,
        headers,
      };
      if (paramsParsed) fetchOptions.body = paramsParsed as string;
      const realOptions = this.interceptors.request.reduce(fetchOptions) as RequestInit;
      fetch(urlParsed, realOptions)
        .then((response) => response.json())
        .then((response) => {
          const { status } = response;
          if (status === 200) {
            const result = this.interceptors.response.  reduce(response);
            resolve(result as T);
          } else {
            const result = this.interceptors.response.reduce(response, false);
            reject(result);
          }
        });
    });
  }

  public get<T>(url: string, params?: IParams, config?: IConfig) {
    return this.send<T>('get', url, params, config);
  }

  public post<T>(url: string, params?: IParams, config?: IConfig) {
    return this.send<T>('post', url, params, config);
  }
}

export default Request;
