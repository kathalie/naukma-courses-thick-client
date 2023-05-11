import {DataSource} from "typeorm";
require('dotenv').config();

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: process.env.HOST || '127.0.0.1',
    port: +(process.env.DB_PORT || 33080),
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || 'root',
    database: process.env.DATABASE || 'database',
    entities: ['dist/**/*.entity.js'],
    charset: 'utf8mb4',
    migrations: ['dist/migration/**/*.js'],
    logging: true
});