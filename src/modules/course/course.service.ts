import {Injectable} from '@nestjs/common';
import axios from "axios";

import {ICourse} from "./types";
import {HtmlParser, Schema} from "../../utils/html_parser";
import {CourseSelectors} from "./course.selectors";
import {Course} from "../../models/entities/Course.entity";
import {CourseFeedbackService} from "../course_feedback/course_feedback.service";
import {plainToClass} from "class-transformer";
import {CheerioNormalizers, toNumber} from "../../utils/cheerio/cheerio_normalizers";

@Injectable()
export class CourseService {
    private readonly courseApiUrl = 'https://my.ukma.edu.ua/course/';

    public async getParsedCourse(code: number): Promise<Course> {
        const response = await axios({
            baseURL: this.courseApiUrl,
            url: `${code}`
        });

        const htmlParser = new HtmlParser(response.data);

        const schema: Schema<ICourse> = {
            code: [CourseSelectors.codeSelector, CheerioNormalizers.toNumber],
            name: [CourseSelectors.nameSelector, CheerioNormalizers.trimmedText],
            description: [CourseSelectors.descriptionSelector(code), CheerioNormalizers.trimmedText],
            facultyName: [CourseSelectors.facultyNameSelector, CheerioNormalizers.trimmedText],
            departmentName: [CourseSelectors.departmentNameSelector, CheerioNormalizers.trimmedText],
            level: [CourseSelectors.levelSelector, CheerioNormalizers.toEducationLevel],
            year: [CourseSelectors.yearSelector, CheerioNormalizers.toYear],
            seasons: [CourseSelectors.seasonsSelector, CheerioNormalizers.toArray(CheerioNormalizers.toSeason, htmlParser.$)],
            creditsAmount: [CourseSelectors.creditsAmountSelector, CheerioNormalizers.firstPartOf(toNumber, ' ')],
            hoursAmount: [CourseSelectors.hoursAmountSelector, CheerioNormalizers.firstPartOf(toNumber, ' ')],
            teacherName: [CourseSelectors.teacherNameSelector, CheerioNormalizers.trimmedText]
        }

        const parsedCourse = plainToClass(Course, htmlParser.parse<ICourse>(schema));

        return await Course.save(parsedCourse);
    }

    public async getCourse(code: number) {
        const cachedCourse = await Course.findOneBy({code});

        return cachedCourse ?? await this.getParsedCourse(code);
    }

    public async getCourseWithStats(code: number) {
        const course = await this.getCourse(code);

        const rating = await new CourseFeedbackService().getAverageRating(code);
        const ratingCount = await new CourseFeedbackService().getRatingCount(code);

        return {...course, rating, ratingCount};
    }
}
