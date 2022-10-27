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
  CLIENT_BASE_URL: `${PROTOCOL ? PROTOCOL + '://' : ''}${HOST}${PORT ? ':' + PORT : ''}`,
};

export const DB_CONFIG = {
  HOST: DB_HOST,
  USER: DB_USER,
  PASSWORD: DB_PASSWORD,
  DATABASE: DB_DATABASE,
}

export default PROJECT_CONFIG;
