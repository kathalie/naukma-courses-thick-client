import {Injectable, InternalServerErrorException} from '@nestjs/common';
import {ICourse} from "./types";
import {CourseSeason, EducationLevel} from "../../common/types";
import axios from "axios";
import cheerio from "cheerio";

@Injectable()
export class CourseService {

    private static urlPrefix: string = "https://my.ukma.edu.ua/course/";

    public async getCourseData(code: number): Promise<ICourse> {
        const url: string = `${CourseService.urlPrefix+code}`;
        const htmlPage =(await axios.get(url)).data;
        const $ = cheerio.load(htmlPage);

        const name: string = $(".page-header > h1").text().trim().split(/\t+/)[0];

        let description: string | undefined = $("#course-card--" + code + "--info").text().trim();
        if(description.length == 0)
            description = undefined;

        const facultyName: string = $("#w0 > table > tbody:first-child > tr:nth-child(3) > td").text().trim();

        const departmentName: string = $("#w0 > table > tbody:first-child > tr:nth-child(4) > td").text().trim();

        const levelStr: string = $("#w0 > table > tbody:first-child > tr:nth-child(5) > td").text().trim();
        let level: EducationLevel;
        if (levelStr == "Бакалавр")
            level = EducationLevel.BACHELOR;
        else
            level = EducationLevel.MASTER;

        const year: 1 | 2 | 3 | 4 = Number($("#w0 > table > tbody:first-child > tr:nth-child(2) > td > span:nth-child(3)")
            .text().trim().split(' ')[0]) as 1 | 2 | 3 | 4;

        const seasons: CourseSeason[] = [];
        const seasonElementList = $("#w0 > table > tbody:nth-child(2)");

        for(const elem of seasonElementList){
            const thValues = $(elem).find("th").text().trim().split('\t');
            thValues.forEach(val => {
                if (val == "Осінь")
                    seasons.push(CourseSeason.AUTUMN);
                else if (val == "Весна")
                    seasons.push(CourseSeason.SPRING);
                else if (val == "Літо")
                    seasons.push(CourseSeason.SUMMER);
            });
        }

        const creditsAmount: number | undefined =
            Number($("#w0 > table > tbody:first-child > tr:nth-child(2) > td > span:first-child")
                .text().trim().split(' ')[0]);

        const hoursAmount: number | undefined =
            Number($("#w0 > table > tbody:first-child > tr:nth-child(2) > td > span:nth-child(2)")
                .text().trim().split(' ')[0]);

        let teacherName: string | undefined = $("#w0 > table > tbody:first-child > tr:nth-child(7) > th + td").text().trim();
        if(teacherName.length == 0)
            teacherName = undefined;
        // console.log(typeof code); //видасть string, хоча code: number
        return {
            code: Number(code),
            name: name,
            description: description,
            facultyName: facultyName,  // Назва факультету
            departmentName: departmentName, // Назва кафедри
            level: level,
            year: year,
            seasons: seasons,
            creditsAmount: creditsAmount,
            hoursAmount: hoursAmount,
            teacherName: teacherName,
        }

    }
}
