import {Injectable} from '@nestjs/common';
import axios from "axios";
import cheerio from "cheerio";
import {IScheduleItem} from "./types";
import {CourseSeason, EducationLevel} from "../../common/types";

@Injectable()
export class ScheduleService {

    public async getSheduleInfo(year: number, season: number): Promise<IScheduleItem[]> {
        console.log(`https://my.ukma.edu.ua/schedule/?year=${year - 1}&season=${season}`);
        return this.scrapeData(`https://my.ukma.edu.ua/schedule/?year=${year - 1}&season=${season}`);
    }

// Async function which scrapes the data
    private async scrapeData(url: string): Promise<IScheduleItem[]> {
        const {data} = await axios.get(url);

        const $ = cheerio.load(data);

        const seasonText = $("div.page-header > h1 > small").text().trim().split(", ")[0];

        const seasonValue = (seasonText == "Весна") ?
            (CourseSeason.SPRING) : ((seasonText == "Осінь") ?
                (CourseSeason.AUTUMN) : (CourseSeason.SUMMER));

        const facultiesList = $("#schedule-accordion > div");
        const resList: IScheduleItem[] = [];

        facultiesList.each((idx, el) => {
            // div id="schedule-faculty-121-heading"
            const heading = $(el).find("div").first();
            const faculty = heading.find("a").text().trim();
            // div id="schedule-faculty-121-accordion" -> elements div class="panel panel-default"
            const facultyBody = heading.next().children().find("div[id^='schedule-faculty'] > div");

            facultyBody.each((idx, el) => {
                // div class="panel-heading" ->> БП-1, 1 рік навчання ...
                const info = $(el).children().first().find("a").text().trim().split(", ");
                const levelText = info[0];
                const levelValue = (levelText == 'БП') ? EducationLevel.BACHELOR : EducationLevel.MASTER;
                const yearNum: number = +info[1].split(" ")[0];

                //div ->id="schedule-faculty-121-1-1" ul ".list-group" -> li's ".list-group-item"
                const specBody = $(el).find("div[id^='schedule-faculty'] li > div");
                specBody.each((idx, el) => {
                    const resElem = $(el).find("a[title='Завантажити']")
                        .filter(function () {
                            return $(this).attr("target") != "_blank";
                        });
                    const specName = resElem.text().trim();
                    const href = resElem.attr('href');
                    const updDateTime = $(el).find("span").text().trim().split(" ");
                    const date = updDateTime[1].split(".").reverse().join("-");
                    const time = updDateTime[2].substring(0, updDateTime[2].length - 1);
                    resList.push({
                        url: href!,
                        updatedAt: date + " " + time,
                        facultyName: faculty,
                        specialityName: specName,
                        level: levelValue,
                        year: yearNum,
                        season: seasonValue
                    });
                });
            });
        });
        return resList;
    }
}
