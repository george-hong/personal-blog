/**
 * class to encode / decode
 */
import cloneDeep from 'lodash.cloneDeep';
import sha256 from 'crypto-js/sha256';
import {
  IDecodeResult,
  ISecretCache,
  ISecretDecodeOptions,
  ISecretEncodeOptions,
  SecretType
} from '../interface/tool.interface';

const secretEncodeOptions = {
  type: SecretType.base64,
};

const secretDecodeOptions = {
  type: SecretType.base64,
};

function encode(payload: string, options?: Partial<ISecretEncodeOptions>): string;
function encode(payload: object, options?: Partial<ISecretEncodeOptions>): string;
function encode(payload: string | object, options?: Partial<ISecretEncodeOptions>) {
  const realOptions = Object.assign(cloneDeep(secretEncodeOptions), options) as ISecretEncodeOptions;
  const { type } = realOptions;
  let encodedStr;
  switch(type) {
    case SecretType.sha256:
      encodedStr = Secret.encodeByMd5(payload);
      break;
    default:
      encodedStr = Secret.encodeByBase64(payload);
  }
  return encodedStr;
}

class Secret {
  static encode = encode;

  static decode<T>(str: string, options?: Partial<ISecretDecodeOptions>): IDecodeResult<T> {
    const realOptions = Object.assign(cloneDeep(secretDecodeOptions), options) as ISecretDecodeOptions
    const { type } = realOptions;
    let decodeResult;
    switch(type) {
      default:
        decodeResult = this.decodeByBase64<T>(str);
    }
    return decodeResult;
  }

  static encodeByBase64(payload: string | object): string {
    const cache: ISecretCache<string | object> = {
      payload,
    };
    // 1. to string
    // 2. transform chinese
    // 3. to base64
    return btoa(encodeURI(JSON.stringify(cache)));
  }

  static decodeByBase64<T>(str: string): IDecodeResult<T> {
    const decodeResult: IDecodeResult<T> = {
      success: false,
    }
    try {
      const cache: unknown = JSON.parse(decodeURI(atob(str)));
      decodeResult.payload = (cache as ISecretCache<T>).payload;
      decodeResult.success = true;
    } catch (error) {
      // Do not need to do anything.
    }
    return decodeResult;
  }

  static encodeByMd5(payload: string | object): string {
    const cache: ISecretCache<string | object> = {
      payload: payload,
    };
    return sha256(JSON.stringify(cache)).toString();
  }

}

export default Secret;
