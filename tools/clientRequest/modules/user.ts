import { clientRequest } from '../index';
import {
  IExistenceVerificationParams,
  ISignUpParams,
  ILoginParams,
  IRegisterResponse,
  ILoginResponse,
  IGetPublicKeyResponse,
  ISignUpResponse,
} from '../../../interface/user.interface';

export function requestToCheckExistence(params: IExistenceVerificationParams) {
  const { field, value } = params;
  const requestParams = {
    field,
    value,
  };
  return clientRequest.get<IRegisterResponse>('/api/user/check-existence', requestParams);
}

export function requestToGetRSAPublicKey() {
  return clientRequest.get<IGetPublicKeyResponse>('/api/user/public-key/get');
}

export function requestToSignUp(params: ISignUpParams) {
  const {
    account,
    password,
    nickName,
  } = params;
  const requestParams = {
    account,
    password,
    nickName,
  };
  return clientRequest.post<ISignUpResponse>('/api/user/sign-up', requestParams);
}

export function requestToLogin(params: ILoginParams) {
  const {
    account,
    password,
  } = params;
  const requestParams = {
    account,
    password,
  };
  return clientRequest.post<ILoginResponse>('/api/user/login', requestParams);
}
