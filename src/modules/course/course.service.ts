import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ICourse } from './types';
import axios from 'axios';
import { parseCoursePage } from './coursePageParser';
@Injectable()
export class CourseService {

    constructor() { }

    async getCourseInfo(courseId: number): Promise<ICourse> {
        return axios.get(`https://my.ukma.edu.ua/course/${courseId}`)
            .then(({ data }) => {
                return parseCoursePage(data, courseId);
            })
            .catch(({ response }) => {
                if (response?.status === 404) {
                    throw new HttpException(`Course with id ${courseId} does not exist`, HttpStatus.NOT_FOUND);
                } else {
                    throw new HttpException(`Can't connect to my.ukma.edu.ua`, HttpStatus.INTERNAL_SERVER_ERROR);
                }
            })
    }
}
