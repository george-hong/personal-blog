/**
 * class to encode / decode
 */
import cloneDeep from 'lodash.cloneDeep';
import sha256 from 'crypto-js/sha256';
import { KEYUTIL, KJUR, RSAKey } from 'jsrsasign';
import {
  IDecodeResult, IRSADecodeOptions, IRSAEncodeOptions,
  ISecretCache,
  ISecretDecodeOptions,
  ISecretEncodeOptions,
  SecretType
} from '../interface/tool.interface';

const secretEncodeOptions = {
  type: SecretType.Base64,
};

const secretDecodeOptions = {
  type: SecretType.Base64,
};

const ALG_NAME = 'RSAOAEP';

function encode(payload: string, options?: Partial<ISecretEncodeOptions>): string;
function encode(payload: object, options?: Partial<ISecretEncodeOptions>): string;
function encode(payload: string | object, options?: Partial<ISecretEncodeOptions>) {
  const realOptions = Object.assign(cloneDeep(secretEncodeOptions), options) as ISecretEncodeOptions;
  const { type } = realOptions;
  let encodedStr;
  switch(type) {
    case SecretType.SHA256:
      encodedStr = Secret.encodeBySHA256(payload);
      break;
    case SecretType.RSA:
      encodedStr = Secret.encodeByRSA(payload, options);
      break;
    default:
      encodedStr = Secret.encodeByBase64(payload);
  }
  return encodedStr;
}

// Generate RSA key pair.
const { prvKeyObj: rsaPrivateKeyObj, pubKeyObj: rsaPublicKeyObj } = KEYUTIL.generateKeypair('RSA', 1024);

class Secret {
  static RSAPublicKey: string = KEYUTIL.getPEM(rsaPublicKeyObj);

  static encode = encode;

  static decode<T>(str: string, options?: Partial<ISecretDecodeOptions>): IDecodeResult<T> {
    const realOptions = Object.assign(cloneDeep(secretDecodeOptions), options) as ISecretDecodeOptions
    const { type } = realOptions;
    let decodeResult;
    switch(type) {
      case SecretType.RSA:
        decodeResult = this.decodeByRSA<T>(str);
        break;
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

  static encodeBySHA256(payload: string | object): string {
    const cache: ISecretCache<string | object> = {
      payload: payload,
    };
    return sha256(JSON.stringify(cache)).toString();
  }

  static encodeByRSA(payload: string | object, options: IRSAEncodeOptions = {}): string {
    const cache: ISecretCache<string | object> = {
      payload: payload,
    };
    const { key } = options;
    let RSAPublicKey: RSAKey = rsaPublicKeyObj as RSAKey;
    if (key) RSAPublicKey = KEYUTIL.getKey(key) as RSAKey;
    return KJUR.crypto.Cipher.encrypt(JSON.stringify(cache), RSAPublicKey, ALG_NAME);
  }

  static decodeByRSA<T>(str: string, options: IRSADecodeOptions = {}): IDecodeResult<T> {
    const decodeResult: IDecodeResult<T> = {
      success: false,
    }
    const { key } = options;
    let RSAPrivateKey: RSAKey = rsaPrivateKeyObj as RSAKey;
    if (key) RSAPrivateKey = KEYUTIL.getKey(key) as RSAKey;
    try {
      const cache = JSON.parse(KJUR.crypto.Cipher.decrypt(str, RSAPrivateKey, ALG_NAME));
      decodeResult.payload = (cache as ISecretCache<T>).payload;
      decodeResult.success = true;
    } catch (error) {
      // Do not need to do anything.
    }
    return decodeResult;
  }
}

export default Secret;
