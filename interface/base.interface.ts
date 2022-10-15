export interface IUniformObject<T> {
  [key: string]: T;
}

export interface IResponseBase {
  status: number;
}
