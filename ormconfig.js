let localConfig = {};

try {
  localConfig = require('./ormconfig.local');
} catch (err) {
  console.warn('No local ormconfig provided!');
}

const defaultConfig = {
  type: 'mysql',
  host: process.env.TYPEORM_HOST || '127.0.0.1',
  port: +process.env.TYPEORM_PORT || 3306,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  charset: 'utf8mb4',
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/**/*.js'],
  cli: {
    migrationsDir: 'src/migrations',
  },
  logging: (process.env.TYPEORM_LOGGING && process.env.TYPEORM_LOGGING === 'true'),
};

module.exports = Object.assign({}, defaultConfig, localConfig);
