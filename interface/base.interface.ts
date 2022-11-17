export interface IUniformObject<T> {
  [key: string]: T;
}

export const enum ErrorEnum {
  formValidation = 1,
}

export interface ISystemError {
  [key: string | number]: unknown;
  type: ErrorEnum,
}
