import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.HOST,
  port: +process.env.APP_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: 'postgres',
  synchronize: false,
  logging: true,
  migrations: ['./src/migrations/*.ts'],
});

export default AppDataSource;
