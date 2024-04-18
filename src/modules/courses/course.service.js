const { Course } = require('./course.model');

async function getOneCourse(code) {
    const course = await Course.findOne({ where: { code } });
    if (!course) {
        throw { status: 404, message: 'Course not found' };
    }
    return course;
}

async function getAllCourses(pageOptionsDto) {
    return await Course.findAll({
        limit: pageOptionsDto.take,
        offset: (pageOptionsDto.page - 1) * pageOptionsDto.take
    });
}

async function createCourse(courseData) {
    return await Course.create(courseData);
}

async function deleteCourse(code) {
    await Course.destroy({ where: { code } });
}

module.exports = { getOneCourse, getAllCourses, createCourse, deleteCourse };
