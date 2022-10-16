import { IUniformObject } from './base.interface';

export interface ISecretEncodeOptions {
  type?: string;
}

export interface ISecretDecodeOptions {
  type?: string;
}

export interface ISecretCache<T> {
  payload: T;
}

export interface IDecodeResult<T> {
  success: boolean;
  payload?: T;
}
