import {Injectable} from '@nestjs/common';
import axios from "axios";

import {ICourse} from "./types";
import { HtmlParser, Schema} from "../../common/htmlParser/html_parser";
import {CheerioRetrievers, toNumber} from "../../common/htmlParser/cheerio_retrievers";
import {CourseSelectors} from "./course.selectors";

@Injectable()
export class CourseService {
    private readonly link = 'https://my.ukma.edu.ua/course/';

    async parsedCourse(code: number): Promise<ICourse> {
        const response = await axios(`${this.link}${code}`);
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

        return htmlParser.parse<ICourse>(schema);
    }
}
