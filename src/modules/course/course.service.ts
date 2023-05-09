import {Injectable} from '@nestjs/common';
import axios from "axios";

import {ICourse} from "./types";
import {HtmlParser, Schema} from "../../common/htmlParser/html_parser";
import {CheerioRetrievers, toNumber} from "../../common/htmlParser/cheerio_retrievers";
import {CourseSelectors} from "./course.selectors";
import {Course} from "../../models/entities/Course.entity";
import {CourseFeedbackService} from "../course_feedback/course_feedback.service";

@Injectable()
export class CourseService {
    private readonly link = 'https://my.ukma.edu.ua/course/';


    async getParsedCourse(code: number): Promise<Course> {
        const response = await axios(`${this.link}${code}`).catch(err => {
            throw err;
        });

        const htmlParser = new HtmlParser(response.data);

        const schema: Schema<ICourse> = {
            code: [CourseSelectors.codeSelector, CheerioRetrievers.toNumber],
            name: [CourseSelectors.nameSelector, CheerioRetrievers.trimmedText],
            description: [CourseSelectors.descriptionSelector(code), CheerioRetrievers.trimmedText],
            facultyName: [CourseSelectors.facultyNameSelector, CheerioRetrievers.trimmedText],
            departmentName: [CourseSelectors.departmentNameSelector, CheerioRetrievers.trimmedText],
            level: [CourseSelectors.levelSelector, CheerioRetrievers.toEducationLevel],
            year: [CourseSelectors.yearSelector, CheerioRetrievers.toYear],
            seasons: [CourseSelectors.seasonsSelector, CheerioRetrievers.toArray(CheerioRetrievers.toSeason, htmlParser.$)],
            creditsAmount: [CourseSelectors.creditsAmountSelector, CheerioRetrievers.firstPartOf(toNumber, ' ')],
            hoursAmount: [CourseSelectors.hoursAmountSelector, CheerioRetrievers.firstPartOf(toNumber, ' ')],
            teacherName: [CourseSelectors.teacherNameSelector, CheerioRetrievers.trimmedText]
        }

        const parsedICourse = htmlParser.parse<ICourse>(schema);
        const parsedCourse = Object.assign(new Course(), parsedICourse) as Course;

        return await Course.save(parsedCourse);
    }

    async getCourse(code: number) {
        const cashedCourse = await Course.findOneBy({code});

        return cashedCourse
            ? cashedCourse
            : await this.getParsedCourse(code);
    }

    async getCourseWithStats(code: number) {
        const course = await this.getCourse(code);

        const rating = await new CourseFeedbackService().getAverageRating(code);
        const ratingCount = await new CourseFeedbackService().getRatingCount(code);

        return {...course, rating, ratingCount};
    }
}
