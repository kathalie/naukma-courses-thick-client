module.exports = {
  type: 'mysql',
  host: '127.0.0.1',
  port: 33080,
  username: 'root',
  password: 'root',
  database: 'edu_backend_courses',
  charset: 'utf8mb4',
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/**/*.js'],
  cli: {
    migrationsDir: 'src/migrations',
  },
};