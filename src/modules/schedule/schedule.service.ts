import {BadRequestException, Injectable} from '@nestjs/common';
import {IScheduleItem} from "./types";
import axios from "axios";
import cheerio from "cheerio";
import {CourseSeason, EducationLevel} from "../../common/types";

@Injectable()
export class ScheduleService {
    //fixed
    public urlPrefix: string = "https://my.ukma.edu.ua/schedule/";

    public async getScheduleData(year: number, seasonStr: string): Promise<IScheduleItem[]> {
        let seasonNum: number;
        let season: CourseSeason;
        switch(seasonStr){
            case 'autumn' : { seasonNum = 1; season = CourseSeason.AUTUMN; break; }
            case 'spring' : { seasonNum = 2; season = CourseSeason.SPRING; break; }
            case 'summer' : { seasonNum = 3; season = CourseSeason.SUMMER; break; }
            // некоректного значення сезону тут бути не може, бо це перевіряється у контролері,
            // тому дефолтне Літо чи інший сезон не викликало б проблем, але напевно краще змінити на помилку
            default : throw new BadRequestException("Incorrect season.");
        }
        if(seasonNum > 1) year = year - 1;

        const url: string = `${this.urlPrefix}?year=${year}&season=${seasonNum}`;
        const htmlPage =(await axios.get(url)).data;
        const $ = cheerio.load(htmlPage);

        const faculties = $("#schedule-accordion > div");
        const scheduleItems: IScheduleItem[] = [];

        for(let elem of faculties){

            const facultyNameElem = $(elem).children().first();
            const facultyName: string = facultyNameElem.find("a").text().trim();
            const facultyElems = facultyNameElem.next().children()
                .find("div[id^='schedule-faculty-'] > div");

            for(let elemF of facultyElems) {

                const lvlAndYear: string[] = $(elemF).children().first()
                    .find("a").text().trim().split(", ");
                const level: EducationLevel = (lvlAndYear[0] == 'БП') ? EducationLevel.BACHELOR : EducationLevel.MASTER;
                const year: 1 | 2 | 3 | 4 = Number(lvlAndYear[1].split(' ')[0]) as 1 | 2 | 3 | 4;

                const specialtyElems = $(elemF).find("div[id^='schedule-faculty-'] div");

                for (let elemS of specialtyElems) {
                    const downloadLinkElem =
                        $(elemS).find("a[title='Завантажити'][target!='_blank']");

                    const nameUnparsed: string = downloadLinkElem.text().trim();
                    let specialtyName: string = "";
                    for(const str of nameUnparsed.split(' ')){
                        if(str.substring(0,2) != "БП" && str.substring(0,2) != "МП")
                            specialtyName += specialtyName == "" ? str : ' ' + str;
                        else break;
                    }

                    const url: string = downloadLinkElem.attr('href')!;

                    const updateInfo = $(elemS).find("span").text().trim().split(' ');
                    console.log(updateInfo);
                    const updateDate: string = updateInfo[1].split('.').reverse().join('-');
                    const updateTime: string = updateInfo[2].replace(')','');

                    scheduleItems.push({
                        url: url,
                        updatedAt: updateDate + ' ' + updateTime,
                        facultyName: facultyName,
                        specialityName: specialtyName,
                        level: level,
                        year: year,
                        season: season
                    });
                }

            }
        }
        return scheduleItems;
    }
}
