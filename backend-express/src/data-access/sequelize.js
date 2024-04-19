const { Sequelize } = require('sequelize');
require('dotenv').config();

// Initialize Sequelize with your database credentials
const sequelize = new Sequelize({
    dialect: 'mysql',
    define: {
        freezeTableName: true,
      },
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || 'Password1',
    database: process.env.DB_NAME || 'webkma',
});

module.exports = { sequelize };
