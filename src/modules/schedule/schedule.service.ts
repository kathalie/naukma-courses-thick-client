import {Injectable} from '@nestjs/common';
import axios from "axios";
import {IScheduleItem} from "./types";
import * as cheerio from "cheerio";
import {CourseSeason, EducationLevel} from "../../common/types";

@Injectable()
export class ScheduleService {

    public async getSchedulesInfo(year: number, season: string) : Promise<IScheduleItem[]>{
        let seasonNum = 0
        let courseSeason : CourseSeason
        let calendarYear = year
        switch (season){
            case "autumn":
                seasonNum = 1
                courseSeason = CourseSeason.AUTUMN
                break
            case "spring":
                seasonNum = 2
                courseSeason = CourseSeason.SPRING
                calendarYear = year-1
                break
            default:
                seasonNum = 3
                courseSeason = CourseSeason.SUMMER
                calendarYear = year-1
                break
        }
        const response = await axios.get(`https://my.ukma.edu.ua/schedule/?year=${calendarYear}&season=${seasonNum}`)
        const scheduleInfo = await this.parseScheduleInfo(response.data,courseSeason)
        console.log(scheduleInfo)
        return scheduleInfo
    }

    private async parseScheduleInfo(html: string,courseSeason: CourseSeason) : Promise<IScheduleItem[]> {
        const $ = cheerio.load(html, null, false)
        const scheduleItemList : IScheduleItem[] = []
        $("#schedule-accordion > div > div > h4 > a").each((i, elf) => {
            const faculty = $(elf)
            const facName = faculty.text().trim()
            let facId : string | undefined = faculty.attr("href")
            if(facId!=undefined){
                $(`${facId}-accordion > div > div > h4 > a`).each((i1, ely) => {
                    const yearEl = $(ely)
                    const yearText = yearEl.text().trim().split(", ")
                    let level : EducationLevel
                    if(yearText[0]=="БП") level = EducationLevel.BACHELOR
                    else level = EducationLevel.MASTER
                    const year : 1|2|3|4 = +yearText[1].substring(0,1) as 1|2|3|4
                    let yearId : string | undefined = yearEl.attr("href")
                    if(yearId!=undefined){
                        $(`${yearId} > ul > li > div`).each((i2, els) => {
                            const updatedAt = $(els).children().first().text()
                            const dateTime = updatedAt.split(" ")
                            const date = dateTime[1].split(".")
                            const updatedAtFinal = `${date[2]}-${date[1]}-${date[0]} ${dateTime[2].substring(0,dateTime[2].length-1)}`
                            const url = $("a:nth-child(3)",els).attr("href")!
                            let specName = $("a:nth-child(4)",els).text().trim()
                            let specNameFinal = specName.substring(0,specName.indexOf(yearText[0])).trim()
                            scheduleItemList.push({
                                url: url,
                                updatedAt: updatedAtFinal,
                                facultyName: facName,
                                specialityName: specNameFinal,
                                level: level,
                                year: year,
                                season: courseSeason
                            })
                        })
                    }
                })
            }
        })
        return scheduleItemList
    }

}
