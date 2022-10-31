import { IUniformObject } from '../interface/base.interface';

export function getParamsObjFromURL(url: string): IUniformObject<string> {
  const result: IUniformObject<string> = {};
  url.split('?')[1].split('&').reduce((total, keyValueString) => {
    const [key, value] = keyValueString.split('=');
    total[key] = value;
    return total;
  }, result)
  return result;
}
