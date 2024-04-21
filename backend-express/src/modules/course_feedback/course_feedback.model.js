const { DataTypes } = require('sequelize');
const { sequelize } = require('../../data-access/sequelize');
const Course = require('../courses/course.model')

const CourseFeedback = sequelize.define('CourseFeedback', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    text: {
        type: DataTypes.TEXT,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
});


module.exports = CourseFeedback;
