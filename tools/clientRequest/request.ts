type methodType = 'get' | 'post';
interface IRequestOptions {
  baseURL?: string;
}
interface IParams {
  [key: string]: number | string | boolean;
}
interface IConfig {
  headers?: { [key: string]: string };
}
interface IURLAndParams {
  url: string;
  params?: IParams | string;
}

const CONNECTOR_OF_GET = '?';
const CONNECTOR_OF_KEY_VALUE = '=';
const CONNECTOR_OF_PARAMS = '&';
const ABSOLUTE_PREFIX = ['http://', 'https://'];

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

  constructor(options: IRequestOptions = {}) {
    this.options = options;
  }

  private serializeParams(params: IParams): string {
    return Object.entries(params).map(keyAndValue => keyAndValue.join(CONNECTOR_OF_KEY_VALUE)).join(CONNECTOR_OF_PARAMS);
  }

  private getUrlAndParamsByMethod(method: methodType, url: string, params?: IParams): IURLAndParams {
    const { baseURL } = this.options;
    const result: IURLAndParams = { url: (baseURL && !Request.isAbsoluteURL(url)) ? baseURL + url : url };
    if (method === 'get' && params) {
      const connector = url.endsWith(CONNECTOR_OF_GET) ? '' :
        url.includes(CONNECTOR_OF_GET) ? CONNECTOR_OF_PARAMS : CONNECTOR_OF_GET;
      result.url += `${connector}${this.serializeParams(params)}`;
    } else if (method === 'post' && params) {
      result.params = JSON.stringify(params);
    }
    return result;
  }

  private send<T>(method: methodType, url: string, params?: IParams, config?: IConfig): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      const { url: urlParsed, params: paramsParsed } = this.getUrlAndParamsByMethod(method, url, params);
      const fetchOptions: RequestInit = {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          ...config?.headers,
        },
      };
      if (paramsParsed) fetchOptions.body = paramsParsed as string;
      fetch(urlParsed, fetchOptions)
        .then((response) => response.json())
        .then((response) => {
          const { status } = response;
          if (status === 200) resolve(response as T);
          else reject(response);
        })
    })
  }

  public get(url: string, params?: IParams, config?: IConfig) {
    return this.send('get', url, params, config);
  }

  public post(url: string, params?: IParams, config?: IConfig) {
    return this.send('post', url, params, config);
  }
}

export default Request;
