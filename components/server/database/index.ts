import mysql from 'mysql';
import type { Connection } from 'mysql';
import { DB_CONFIG } from '../../../config/project';

class DataBase {
  private connection: Connection;

  constructor() {
    this.connection = mysql.createConnection({
      host: DB_CONFIG.HOST,
      user: DB_CONFIG.USER,
      password: DB_CONFIG.PASSWORD,
      database: DB_CONFIG.DATABASE,
    });
  }

  public query<T>(sqlSentence: string) {
    return new Promise<T>((resolve, reject) => {
      this.connection.connect();
      this.connection.query(sqlSentence, (error, result: T, fields) => {
        this.connection.end();
        if (error) return reject(error);
        resolve(result);
      });
    });
  }
}

export default DataBase;
