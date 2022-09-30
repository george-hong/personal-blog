import { requestInstance } from '../index';
import { IExistenceVerificationParams } from '../../../interface/user.interface';

export function requestToCheckExistence(params: IExistenceVerificationParams) {
  const { name } = params;
  const requestParams = {
    name,
  };
  return requestInstance.get('/api/user/existence', requestParams);
}
