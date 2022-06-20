import knex, { Knex } from 'knex';
import dotenv from 'dotenv';

dotenv.config();

export abstract class BaseData {
  private static connection: Knex | null;

  protected getConnection() {
    if (!BaseData.connection) {
      BaseData.connection = knex({
        client: 'mysql',
        connection: {
          host: process.env.DB_HOST,
          port: 3306,
          user: process.env.DB_USER,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_NAME,
          multipleStatements: true
        },
      });
    }
    return BaseData.connection;
  }
}