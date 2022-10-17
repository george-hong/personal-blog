export enum SecretType {
  base64 = 'base64',
  sha256 = 'sha256',
}

export interface ISecretEncodeOptions {
  type?: SecretType;
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
