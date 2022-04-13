import { ICourse, YearOfStudy } from './types';
import * as cheerio from 'cheerio';
import { CourseSeason, EducationLevel } from '../../common/types';



function processTable(tbody: cheerio.Element): Partial<ICourse> {
    const $ = cheerio.load(tbody);
    const rows = $('tr');

    let tableElements = {};

    $(rows).each((index: number, element: cheerio.Element) => {

        const key = $(element).find('th').text()
            .replace(/[\n\t]/g, '')
            .toLowerCase();
        switch (key) {
            case 'код':
                tableElements = { ...tableElements, 'code': Number($(element).find('td').text()) }
                break;
            case 'інформація':
                const tags = $(element).find('td').find('span');
                tableElements = {
                    ...tableElements,
                    creditsAmount: Number($(tags[0]).text().split(' ')[0]),
                    hoursAmount: Number($(tags[1]).text().split(' ')[0]),
                    year: Number($(tags[2]).text().split(' ')[0]) as YearOfStudy
                }
                break;
            case 'факультет':
                tableElements = { ...tableElements, 'facultyName': $(element).find('td').text() }
                break;
            case 'кафедра':
                tableElements = { ...tableElements, 'departmentName': $(element).find('td').text() }
                break;
            case 'освітній рівень':
                const value = $(element).find('td').text() === 'Бакалавр' ? EducationLevel.BACHELOR : EducationLevel.MASTER;
                tableElements = Object.assign(Object.assign({}, tableElements), { 'level': value });
                break;
            case 'викладач':
                tableElements = { ...tableElements, 'teacherName': $(element).find('td').text() }
                break;
            case 'семестри':

                const seasons: CourseSeason[] = []
                $(element).find('td').find('span').each((i: number, el: cheerio.Element) => {
                    const season = $(el).text();
                    if (season.slice(-1) === 'д') {
                        seasons.push(CourseSeason.SUMMER);
                    } else if (Number(season.split(' ')[1]) % 2 === 1) {
                        seasons.push(CourseSeason.AUTUMN);
                    } else if (Number(season.split(' ')[1]) % 2 === 0) {
                        seasons.push(CourseSeason.SPRING);
                    }
                });

                tableElements = { ...tableElements, seasons }
                break;
        }
    })
    return tableElements
}

export function parseCoursePage(html: string, courseId: number): ICourse {
    const $ = cheerio.load(html);

    const tableSections = $('#w0 table tbody');

    const name = $('title').text();
    const description = $(`#course-card--${courseId}--info`).text().replace(/[\n\t]/g, '');

    const { code = 0,
        level = EducationLevel.BACHELOR,
        creditsAmount = 0, hoursAmount = 0,
        year = 1,
        facultyName = '',
        departmentName = '',
        teacherName = '' } = processTable(tableSections[0]);

    const { seasons = [] } = processTable(tableSections[2]);

    return {
        code,
        name,
        description,
        facultyName,
        departmentName,
        level: level,
        year,
        seasons,
        creditsAmount,
        hoursAmount,
        teacherName,
    }
}

