let localConfig = {};

try {
  localConfig = require('./ormconfig.local');
} catch (error) {
  console.warn('No local configs provided! ');
}

const defaultConfig = {
  type: 'mysql',
  host: process.env.TYPEORM_HOST,
  port: +process.env.TYPEORM_PORT,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  entities: ['dist/**/*{.ts,.js}'],
  migrations: ['dist/migration/**/*.js'],
  cli: {
    migrationsDir: 'src/migration',
  },
  keepConnectionAlive: true,
  logging: (process.env.TYPEORM_LOGGING && process.env.TYPEORM_LOGGING === "true"),
}
module.exports = Object.assign({}, defaultConfig, localConfig);
