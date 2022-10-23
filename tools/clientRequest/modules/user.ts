import { requestInstance } from '../index';
import {
  IExistenceVerificationParams,
  ISignUpParams,
  ILoginParams,
  IRegisterResponse,
  ILoginResponse,
  IGetPublicKeyResponse,
} from '../../../interface/user.interface';

export function requestToCheckExistence(params: IExistenceVerificationParams) {
  const { field, value } = params;
  const requestParams = {
    field,
    value,
  };
  return requestInstance.get<IRegisterResponse>('/api/user/check-existence', requestParams);
}

export function requestToGetRSAPublicKey() {
  return requestInstance.get<IGetPublicKeyResponse>('/api/user/public-key/get');
}

export function requestToSignUp(params: ISignUpParams) {
  const { account, password } = params;
  const requestParams = {
    account,
    password,
  };
  return requestInstance.post('/api/user/sign-up', requestParams);
}

export function requestToLogin(params: ILoginParams) {
  const { account, password } = params;
  const requestParams = {
    account,
    password,
  };
  return requestInstance.post<ILoginResponse>('/api/user/login', requestParams);
}
