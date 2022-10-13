import mysql from 'mysql';
import type { Connection } from 'mysql';

class DataBase {
  private connection: Connection;

  constructor() {
    this.connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '123456',
      database: 'personal-blog'
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
