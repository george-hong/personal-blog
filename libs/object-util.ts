import { IUniformObject } from '../interface/base.interface';

export const filterObjectKeys = <V>(obj: object, filter: (key: string | number, value: V) => boolean) => {
 const result: IUniformObject<V> = {};
 Object.entries(obj).forEach(kayAndValue => {
   const [key, value] = kayAndValue;
   const isSave = filter(key, value);
   if (isSave) result[key] = value;
 });
 return result;
}
