import { Injectable } from '@nestjs/common';
import { ICourse } from "./types";
import axios from "axios";
import * as cheerio from 'cheerio';
import {CourseSeason, EducationLevel} from "../../common/types";

@Injectable()
export class CourseService {

    public async getCourseInfo(code: number) : Promise<ICourse>{
        const response = await axios.get(`https://my.ukma.edu.ua/course/${code}`)
        const course = await this.parseCourse(response.data,code)
        console.log(course)
        return course
    }

    private async parseCourse(html: string, code: number) : Promise<ICourse> {
        const $ = cheerio.load(html, null, false)
        const name = $("h1", ".page-header").text().split('\t')[2]
        let d = $(`#course-card--${code}--info`).text().trim()
        const description : string | undefined = d.length != 0 ? d : undefined
        const faculty = $("#w0 > table > tbody:nth-child(1) > tr:nth-child(3) > td").text()
        const department = $("#w0 > table > tbody:nth-child(1) > tr:nth-child(4) > td").text()
        const level = $("#w0 > table > tbody:nth-child(1) > tr:nth-child(5) > td").text() == "Бакалавр" ?
            EducationLevel.BACHELOR : EducationLevel.MASTER
        const year: 1|2|3|4 = +$("#w0 > table > tbody:nth-child(1) > tr:nth-child(2) > td > span:nth-child(3)")
            .text().split(" ")[0] as 1|2|3|4
        const seasons: CourseSeason[] = []
        $("#w0 > table > tbody:nth-child(2) > tr:nth-child(2) > td > span").each((i, el) => {
            let season = $(el).text().split(" ")[1]
            if(season.length==1){
                let seasonNum = +season
                if(seasonNum%2==1) seasons.push(CourseSeason.AUTUMN)
                else seasons.push(CourseSeason.SPRING)
            } else {
                seasons.push(CourseSeason.SUMMER)
            }
        })
        let c = $("#w0 > table > tbody:nth-child(1) > tr:nth-child(2) > td > span:nth-child(1)")
            .text().split(" ")[0]
        let credits : number | undefined = c.length != 0 ? +c : undefined // if length == 0 make undefined
        let h = $("#w0 > table > tbody:nth-child(1) > tr:nth-child(2) > td > span:nth-child(2)")
            .text().split(" ")[0]
        let hours : number | undefined = h.length != 0 ? +h : undefined // if length == 0 make undefined
        const teacherTr = $("#w0 > table > tbody:nth-child(1) > tr:nth-child(7)")
        let teacher : string | undefined = undefined
        if(teacherTr.children().length==2){
            teacher = $("td",teacherTr).text()
        }
        return {
            code: +code,
            name: name,
            description: description,
            facultyName: faculty,  // Назва факультету
            departmentName: department, // Назва кафедри
            level: level,
            year: year,
            seasons: seasons,
            creditsAmount: credits,
            hoursAmount: hours,
            teacherName: teacher
        }
    }

}
