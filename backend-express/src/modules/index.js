// describes relations between the models
const Course = require('./courses/course.model')
const CourseFeedback = require('./course_feedback/course_feedback.model')

Course.hasMany(CourseFeedback)
CourseFeedback.belongsTo(Course, {
    foreignKey: 'CourseCode'
})

module.exports = {
    Course,
    CourseFeedback
}