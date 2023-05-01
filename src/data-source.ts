import {DataSource} from "typeorm";

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: '127.0.0.1',
    port: 33080,
    username: 'root',
    password: 'root',
    database: 'node-js-task-03',
    entities: ['dist/**/*.entity.js'],
    //entities: [CourseFeedback],
    charset: 'utf8mb4',
    migrations: ['dist/migrations/**/*.js'],
    logging: true
});