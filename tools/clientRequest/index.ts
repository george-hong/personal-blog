import Request from './request';
import PROJECT_CONFIG from '../../config/project';
import { TOKEN_FIELD } from '../../config/constant';

export const serverRequest = new Request({ baseURL: PROJECT_CONFIG.CLIENT_BASE_URL });
export const clientRequest = new Request({
  baseURL: PROJECT_CONFIG.CLIENT_BASE_URL,
  beforeSend(options) {
    const token = localStorage.getItem(TOKEN_FIELD);
    if (!options) options = {};
    if (!options.headers) options.headers = {};
    if (token) options.headers.token = token;
    return options;
  }
});
