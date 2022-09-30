import Request from './request';
import PROJECT_CONFIG from '../../config/project';

export const generateClientRequest = () => {
  const request = new Request({ baseURL: PROJECT_CONFIG.CLIENT_BASE_URL });
  return request;
}

export const requestInstance = new Request({ baseURL: PROJECT_CONFIG.CLIENT_BASE_URL });
