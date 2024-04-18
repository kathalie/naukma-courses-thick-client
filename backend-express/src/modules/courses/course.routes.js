const express = require('express');
const coursesRouter = express.Router();
const courseController = require('./course.controller');
const {authenticateToken, authorizeAdmin} = require("../auth/auth.middleware");

coursesRouter.get('/:code', authenticateToken, courseController.getOneCourse);
coursesRouter.get('/', authenticateToken,  courseController.getAllCourses);
coursesRouter.post('/', authenticateToken, authorizeAdmin, courseController.createCourse);
coursesRouter.delete('/:code', authenticateToken, authorizeAdmin, courseController.deleteCourse);

module.exports = coursesRouter;
