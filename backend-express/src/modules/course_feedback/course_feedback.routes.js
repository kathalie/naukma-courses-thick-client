const express = require('express');
const router = express.Router();
const courseFeedbackController = require('./course_feedback.controller');
const {authenticateToken, authorizeAdmin} = require("../auth/auth.middleware");

router.get('/', authenticateToken, courseFeedbackController.getAllCourseFeedbacks)
router.get('/:courseId', authenticateToken, courseFeedbackController.getCourseFeedbacks);
router.post('/', authenticateToken, authorizeAdmin, courseFeedbackController.createCourseFeedback);
router.put('/:feedbackId', authenticateToken, authorizeAdmin, courseFeedbackController.updateCourseFeedback);
router.delete('/:feedbackId', authenticateToken, authorizeAdmin, courseFeedbackController.deleteCourseFeedback);

module.exports = router;
