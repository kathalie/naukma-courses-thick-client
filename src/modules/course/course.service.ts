import {Injectable} from '@nestjs/common';
import axios from "axios";
import cheerio from "cheerio";
import {ICourse} from "./types";
import {CourseSeason, EducationLevel} from "../../common/types";

@Injectable()
export class CourseService {

    public async getCourseInfo(code: number): Promise<ICourse> {
        return this.scrapeData(`https://my.ukma.edu.ua/course/${code}`);
    }

// Async function which scrapes the data
    private async scrapeData(url: string): Promise<ICourse> {
        const {data} = await axios.get(url);

        const $ = cheerio.load(data);
        const code: number = +$("#w0 > table > tbody:nth-child(1) > tr:nth-child(1) > td").text();
        const name = $(".page-header h1").text().trim().split('\t\t')[0];
        const faculty = $("#w0 > table > tbody:nth-child(1) > tr:nth-child(3) > td").text();
        const kafedra = $("#w0 > table > tbody:nth-child(1) > tr:nth-child(4) > td").text();
        const levelUkr = $("#w0 > table > tbody:nth-child(1) > tr:nth-child(5) > td").text();
        const teacherFIO = $("#w0 > table > tbody:nth-child(1) > tr:nth-child(7) > th").next().text();

        const credits: number = +$("#w0 > table > tbody:nth-child(1) > tr:nth-child(2) > td > span:nth-child(1)")
            .text().trim().split(' ')[0];
        const hours: number = +$("#w0 > table > tbody:nth-child(1) > tr:nth-child(2) > td > span:nth-child(2)")
            .text().trim().split(' ')[0];
        const yearN: number = +$("#w0 > table > tbody:nth-child(1) > tr:nth-child(2) > td > span:nth-child(3)")
            .text().trim().split(' ')[0];

        const desc = $("#course-card--" + code + "--info").text();
        const listItems = $("#w0 > table > tbody:nth-child(2)");
        const seasonsList: CourseSeason[] = [];
        listItems.each((idx, el) => {
            const textItems = $(el).find("th").text().trim().split('\t');
            textItems.forEach(text => {
                if (text == "Весна")
                    seasonsList.push(CourseSeason.SPRING);
                else if (text == "Осінь")
                    seasonsList.push(CourseSeason.AUTUMN);
                else if (text == "Літо")
                    seasonsList.push(CourseSeason.SUMMER);
            });
        });

        let levelObj;
        if (levelUkr == "Бакалавр") {
            levelObj = EducationLevel.BACHELOR;
        } else {
            levelObj = EducationLevel.MASTER;
        }

        return {
            code: code,
            name: name,
            description: desc,
            facultyName: faculty, // Назва факультету
            departmentName: kafedra, // Назва кафедри
            level: levelObj,
            year: yearN,
            seasons: seasonsList,
            creditsAmount: credits,
            hoursAmount: hours,
            teacherName: teacherFIO
        };

    }
}
