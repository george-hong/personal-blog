interface IClientRequestOptions {
  baseURL?: string;
}
interface IParams {
  [key: string]: number | string | boolean;
}
interface IConfig {
  headers?: { [key: string]: string };
}
interface IURLAndParams { url: string, params?: IParams | string };

type methodType = 'get' | 'post';

const CONNECTOR_OF_GET = '?';
const CONNECTOR_OF_KEY_VALUE = '=';
const CONNECTOR_OF_PARAMS = '&';

class ClientRequest {
  private options: IClientRequestOptions;

  constructor(options: IClientRequestOptions = {}) {
    this.options = options;
  }

  private serializeParams(params: IParams): string {
    return Object.entries(params).map(keyAndValue => keyAndValue.join(CONNECTOR_OF_KEY_VALUE)).join(CONNECTOR_OF_PARAMS);
  }

  private getUrlAndParamsByMethod(method: methodType, url: string, params?: IParams): IURLAndParams {
    const result: IURLAndParams = { url };
    if (method === 'get' && params) {
      const connector = url.endsWith(CONNECTOR_OF_GET) ? '' :
        url.includes(CONNECTOR_OF_GET) ? CONNECTOR_OF_PARAMS : CONNECTOR_OF_GET;
      result.url += `${connector}${this.serializeParams(params)}`;
    } else if (method === 'post' && params) {
      result.params = JSON.stringify(params);
    }
    return result;
  }

  private send(method: methodType, url: string, params?: IParams, config?: IConfig) {
    const { url: urlParsed, params: paramsParsed } = this.getUrlAndParamsByMethod(method, url, params);
    const fetchOptions = {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        ...config?.headers,
      },
    };
    if (paramsParsed) fetchOptions.body = paramsParsed as string;
    return fetch(urlParsed, fetchOptions).then((response) => response.json());
  }

  public get(url: string, params?: IParams, config?: IConfig) {
    return this.send('get', url, params, config);
  }

  public post(url: string, params?: IParams, config?: IConfig) {
    return this.send('post', url, params, config);
  }
}

export default ClientRequest;
