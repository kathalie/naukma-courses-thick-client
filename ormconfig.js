const defaultConfig = {
	type: "postgres",
	host: process.env.TYPEORM_HOST || '127.0.0.1',
	port: +process.env.TYPEORM_PORT || 5432,
	username: process.env.TYPEORM_USERNAME,
	password: process.env.TYPEORM_PASSWORD,
	database: process.env.TYPEORM_DATABASE,
	charset: "utf8",
	entities: ['dist/**/*.entity{.ts,.js}'],
	migrations: ['dist/migrations/**/*.js'],
	cli: {
		migrationsDir: 'src/migrations',
	},
	logging: true,
}

module.exports = Object.assign({}, defaultConfig);