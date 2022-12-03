import Request from './request';
import PROJECT_CONFIG from '../../config/project';
import { TOKEN_FIELD } from '../../config/constant';
import { UserForClient } from '../../business/user';

export const serverRequest = new Request({ baseURL: PROJECT_CONFIG.CLIENT_BASE_URL });
export const clientRequest = new Request({
  baseURL: PROJECT_CONFIG.CLIENT_BASE_URL,
  beforeSend(options) {
    const token = localStorage.getItem(TOKEN_FIELD);
    if (!token) return options;
    const isTokenIllegal = UserForClient.removeUserInfoIfIllegal();
    if (isTokenIllegal) return options;
    if (!options) options = {};
    if (!options.headers) options.headers = {};
    if (token) options.headers = {
      ...options.headers,
      token,
    };
    return options;
  },
});

export default Request;
