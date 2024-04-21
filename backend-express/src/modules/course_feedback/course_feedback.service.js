const {CourseFeedback} = require('../index');

async function createCourseFeedback(params, userId) {
    try {
        params['user_id'] = userId
        const courseFeedback = await CourseFeedback.create(params);
        return courseFeedback;
    } catch (error) {
        throw new Error('Could not create course feedback');
    }
}


async function getCourseFeedbacksAll() {
    try {
        const courseFeedbacks = await CourseFeedback.findAll();
        return courseFeedbacks;
    } catch (error) {
        throw new Error('Could not fetch course feedbacks')
    }
}
async function getCourseFeedbacks(courseId) {
    try {
        const courseFeedbacks = await CourseFeedback.findAll({ where: { courseCode: courseId } });
        return courseFeedbacks;
    } catch (error) {
        throw new Error('Could not fetch course feedbacks');
    }
}

async function updateCourseFeedback(feedbackId, updatedFields) {
    try {
        const feedback = await CourseFeedback.findByPk(feedbackId);
        if (!feedback) throw new Error('Course feedback not found');
        await feedback.update(updatedFields);
        return feedback;
    } catch (error) {
        throw new Error('Could not update course feedback');
    }
}

async function deleteCourseFeedback(feedbackId) {
    try {
        const feedback = await CourseFeedback.findByPk(feedbackId);
        if (!feedback) throw new Error('Course feedback not found');
        await feedback.destroy();
        return feedback;
    } catch (error) {
        throw new Error('Could not delete course feedback');
    }
}

module.exports = {
    createCourseFeedback,
    getCourseFeedbacks,
    updateCourseFeedback,
    deleteCourseFeedback,
    getCourseFeedbacksAll
};
