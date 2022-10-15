import { requestInstance } from '../index';
import {
  IExistenceVerificationParams,
  ISignUpParams,
  ILoginParams,
  IRegisterResponse,
} from '../../../interface/user.interface';

export function requestToCheckExistence(params: IExistenceVerificationParams) {
  const { name } = params;
  const requestParams = {
    name,
  };
  return requestInstance.get<IRegisterResponse>('/api/user/existence', requestParams);
}

export function requestToSignUp(params: ISignUpParams) {
  const { name, password } = params;
  const requestParams = {
    name,
    password,
  };
  return requestInstance.post('/api/user/sign-up', requestParams);
}

export function requestToLogin(params: ILoginParams) {
  const { name, password } = params;
  const requestParams = {
    name,
    password,
  };
  return requestInstance.post('/api/user/login', requestParams);
}
