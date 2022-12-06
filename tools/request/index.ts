import Request from './request';
import PROJECT_CONFIG from '../../config/project';
import { TOKEN_FIELD } from '../../config/constant';
import { UserForClient } from '../../business/user';
import toast, { ToastType } from '../toast';

const localClientRequest = new Request({
  baseURL: PROJECT_CONFIG.CLIENT_BASE_URL,
});
localClientRequest.interceptors.request.use((config: RequestInit) => {
  const token = localStorage.getItem(TOKEN_FIELD);
  if (!token) return config;
  const isTokenIllegal = UserForClient.removeUserInfoIfIllegal();
  if (isTokenIllegal) return config;
  if (token) config.headers = {
    ...config.headers,
    token,
  };
  return config;
});
// TODO: fix types
// TODO: remove notice component
localClientRequest.interceptors.response.use(undefined, (response: any) => {
  const message = response?.message || 'unknown error';
  toast(message, { type: ToastType.error });
  return response;
})
export const serverRequest = new Request({ baseURL: PROJECT_CONFIG.CLIENT_BASE_URL });
export const clientRequest = localClientRequest;

export default Request;
