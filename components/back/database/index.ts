import mysql from 'mysql';
import type { Connection } from 'mysql';
import { DB } from '../../../config/project';

class DataBase {
  private connection: Connection;

  constructor() {
    this.connection = mysql.createConnection({
      host: DB.HOST,
      user: DB.USER,
      password: DB.PASSWORD,
      database: DB.DATABASE
    });

    this.connection.connect();
  }

  public query<T>(sqlSentence: string) {
    return new Promise<T>((resolve, reject) => {
      this.connection.query(sqlSentence, function (error, result: T, fields) {
        if (error) return reject(error);
        resolve(result);
      })
    });
  }
}

export default DataBase;
