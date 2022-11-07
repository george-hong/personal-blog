import { clientRequest } from '../index';
import {
  IExistenceVerificationParams,
  ISignUpParams,
  ISignInParams,
  ISignUpResponse,
  ISignInResponse,
  IGetPublicKeyResponse,
} from '../../../interface/request-response/user.interface';

export function requestToCheckExistence(params: IExistenceVerificationParams) {
  const { field, value } = params;
  const requestParams = {
    field,
    value,
  };
  return clientRequest.get<ISignUpResponse>('/api/user/check-existence', requestParams);
}

export function requestToGetRSAPublicKey() {
  return clientRequest.get<IGetPublicKeyResponse>('/api/user/public-key/get');
}

export function requestToSignUp(params: ISignUpParams) {
  const {
    account, password, nickName,
  } = params;
  const requestParams = {
    account,
    password,
    nickName,
  };
  return clientRequest.post<ISignInResponse>('/api/user/sign-up', requestParams);
}

export function requestToSignIn(params: ISignInParams) {
  const {
    account, password,
  } = params;
  const requestParams = {
    account,
    password,
  };
  return clientRequest.post<ISignInResponse>('/api/user/sign-in', requestParams);
}
