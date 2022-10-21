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
import {
  isString,
  splitStringByByteLength,
} from '../libs/base-type-utils';

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
      const realPayload = (isString(payload) ? payload : JSON.stringify(payload)) as string;
      encodedStr = Secret.encodeByRSA(realPayload, options);
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
  static RSAPrivateKey: string = KEYUTIL.getPEM(rsaPrivateKeyObj, 'PKCS8PRV');

  static RSASplitString: string = '.';

  static encode = encode;

  static decode<T>(str: string, options?: Partial<ISecretDecodeOptions>): IDecodeResult<T> | IDecodeResult<string> {
    const realOptions = Object.assign(cloneDeep(secretDecodeOptions), options) as ISecretDecodeOptions
    const { type } = realOptions;
    let decodeResult;
    switch(type) {
      case SecretType.RSA:
        decodeResult = this.decodeByRSA(str);
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

  static encodeByRSA(payload: string, options: IRSAEncodeOptions = {}): string {
    const { key } = options;
    const RSAPublicKey = KEYUTIL.getKey(key ?? this.RSAPublicKey) as RSAKey;
    return (
      splitStringByByteLength(payload, 117)
        .map(str => KJUR.crypto.Cipher.encrypt(str, RSAPublicKey, ALG_NAME))
        .join(this.RSASplitString)
    );
  }

  static decodeByRSA(str: string, options: IRSADecodeOptions = {}): IDecodeResult<string> {
    const decodeResult: IDecodeResult<string> = {
      success: false,
    }
    const { key } = options;
    const RSAPrivateKey = KEYUTIL.getKey(key ?? this.RSAPrivateKey) as RSAKey;
    try {
      const payload = (
        str
          .split(this.RSASplitString)
          .map(secretString => {
            return KJUR.crypto.Cipher.decrypt(secretString, RSAPrivateKey, ALG_NAME);
          })
          .join()
      );
      decodeResult.payload = payload;
      decodeResult.success = true;
    } catch (error) {
      throw(error)
      // Do not need to do anything.
    }
    return decodeResult;
  }
}

export default Secret;
