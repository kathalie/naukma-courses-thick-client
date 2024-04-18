const { DataTypes } = require('sequelize');
const {sequelize} = require('../../data-access/sequelize');

const Course = sequelize.define('Course', {
    code: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
    },
    facultyName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    departmentName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    level: {
        type: DataTypes.ENUM('Bachelor', 'Master'),
        allowNull: false,
    },
    year: {
        type: DataTypes.ENUM('1', '2', '3', '4'),
        allowNull: false,
    },
    seasons: {
        type: DataTypes.STRING,
        allowNull: false,
        get() {
            return this.getDataValue('seasons').split(';'); // Assuming seasons are stored as a semicolon-separated string
        },
        set(val) {
            this.setDataValue('seasons', val.join(';')); // Join array of seasons into a semicolon-separated string
        },
    },
    creditsAmount: {
        type: DataTypes.INTEGER,
    },
    hoursAmount: {
        type: DataTypes.INTEGER,
    },
    teacherName: {
        type: DataTypes.STRING,
    },
});

module.exports = Course;
