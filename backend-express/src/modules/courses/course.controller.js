const courseService = require('./course.service');

async function getOneCourse(req, res, next) {
    const { code } = req.params;
    try {
        const course = await courseService.getOneCourse(code);
        res.json(course);
    } catch (error) {
        next(error);
    }
}

async function getAllCourses(req, res, next){
    const { page, order, take } = req.query;
    const pageOptionsDto = {
        page: parseInt(page, 10) || 1,
        order: order || 'ASC',
        take: parseInt(take, 10) || 10
    };
    try {
        const courses = await courseService.getAllCourses(pageOptionsDto);
        res.json(courses);
    } catch (error) {
        next(error);
    }
}

async function createCourse(req, res, next) {
    try {
        const course = await courseService.createCourse(req.body);
        res.status(201).json(course);
    } catch (error) {
        next(error);
    }
}

async function deleteCourse(req, res, next) {
    const { code } = req.params;
    try {
        await courseService.deleteCourse(code);
        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
}

module.exports = { getOneCourse, getAllCourses, createCourse, deleteCourse };
