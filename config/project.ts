const PROTOCOL = 'http';
const HOST = 'localhost';
const PORT = '3000';


const PROJECT_CONFIG = {
  PROTOCOL,
  HOST,
  PORT,
  CLIENT_BASE_URL: `${PROTOCOL ? PROTOCOL + '://' : ''}${HOST}${PORT ? ':' + PORT : ''}`,
};

export default PROJECT_CONFIG;
