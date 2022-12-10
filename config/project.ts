// service
const PROTOCOL = 'http';
const HOST = 'localhost';
const PORT = '3000';

// database
const DB_HOST = 'localhost';
const DB_USER = 'root';
const DB_PASSWORD = '123456';
const DB_DATABASE = 'personal-blog';

const PROJECT_CONFIG = {
  PROTOCOL,
  HOST,
  PORT,
  CLIENT_BASE_URL: `${ PROTOCOL ? PROTOCOL + '://' : '' }${ HOST }${ PORT ? ':' + PORT : '' }`,
};

export const DB_CONFIG = {
  HOST: DB_HOST,
  USER: DB_USER,
  PASSWORD: DB_PASSWORD,
  DATABASE: DB_DATABASE,
};

// The default language should belong to available languages.
export const DEFAULT_LANGUAGE = 'zh';

// To support new language, you should add translation on public locale dir accordingly.
export const AVAILABLE_LANGUAGES_CONFIG = {
  zh: {
    description: '中文',
  },
  en: {
    description: 'English',
  },
}

export const REQUEST_DEFAULT_ERROR_MESSAGE = '未知异常'

export default PROJECT_CONFIG;
