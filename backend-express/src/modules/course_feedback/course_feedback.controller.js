const courseFeedbackService = require('./course_feedback.service');

async function createCourseFeedback(req, res, next) {
    try {
        const userId = req.user.id
        const feedback = await courseFeedbackService.createCourseFeedback(req.body, userId);
        res.json(feedback);
    } catch (error) {
        next(error);
    }
}

async function getCourseFeedbacks(req, res, next) {
    try {
        const { courseId } = req.params;
        const feedbacks = await courseFeedbackService.getCourseFeedbacks(courseId);
        res.json(feedbacks);
    } catch (error) {
        next(error);
    }
}

async function getAllCourseFeedbacks(req, res, next) {
    try {
        const feedbacks = await courseFeedbackService.getCourseFeedbacksAll();
        res.json(feedbacks);
    } catch (error) {
        next(error);
    }
}

async function updateCourseFeedback(req, res, next) {
    try {
        const { feedbackId } = req.params;
        const updatedFields = req.body;
        const feedback = await courseFeedbackService.updateCourseFeedback(feedbackId, updatedFields);
        res.json(feedback);
    } catch (error) {
        next(error);
    }
}

async function deleteCourseFeedback(req, res, next) {
    try {
        const { feedbackId } = req.params;
        const feedback = await courseFeedbackService.deleteCourseFeedback(feedbackId);
        res.json(feedback);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    createCourseFeedback,
    getCourseFeedbacks,
    updateCourseFeedback,
    deleteCourseFeedback,
    getAllCourseFeedbacks,
};
