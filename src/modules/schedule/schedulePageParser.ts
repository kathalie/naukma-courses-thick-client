import { HttpException, HttpStatus } from '@nestjs/common';
import * as cheerio from 'cheerio';
import moment = require('moment');
import { getEducationLevel } from '../../common/mappingHelper';
import { CourseSeason, EducationLevel } from '../../common/types';
import { IScheduleItem } from "./types";

let season: CourseSeason;

function getElementName($: cheerio.Root, element: cheerio.Element) {
    return $(element).find('> div.panel-heading > h4 > a').text().replace(/\s+/g, '').trim();
}

function parseSpeciality($: cheerio.Root, specialityElement: cheerio.Element, facultyName: string, year: number, level: EducationLevel): IScheduleItem {
    const { download, href } = ($(specialityElement).find('[title=Завантажити]')[1] as cheerio.TagElement).attribs;
    const specialityName = download.replace(/_/g, ' ').replace(/ +/g, ' ').split(/(БП)|(МП)/g)[0];
    const updatedAt = moment($(specialityElement).find('.text-muted').text().slice(11, -1), 'DD.MM.YYYY HH:mm:ss').format('YYYY-MM-DD HH:mm:ss');
    return {
        facultyName,
        specialityName,
        level,
        updatedAt,
        year: year as 1 | 2 | 3 | 4,
        season,
        url: href
    }
}

function parseProgramYearItem($: cheerio.Root, programYearElement: cheerio.Element, facultyName: string): IScheduleItem[] {
    const [program, year] = getElementName($, programYearElement).split(', ');
    const educationLevel = getEducationLevel(program);
    const programYear = Number(year[0]);
    return $(programYearElement).find('.list-group-item').toArray().reduce((scheduleItems: IScheduleItem[], element: cheerio.Element) => {
        const specialitySchedule = parseSpeciality($, element, facultyName, programYear, educationLevel);
        return [...scheduleItems, specialitySchedule];
    }, []);
}


function parseFacultyItem($: cheerio.Root, facultyElement: cheerio.Element): IScheduleItem[] {
    const facultyName = getElementName($, facultyElement);
    return $(facultyElement).find('.panel-default').toArray().reduce((scheduleItems: IScheduleItem[], element: cheerio.Element) => {
        const programItemSchedules = parseProgramYearItem($, element, facultyName);
        return [...scheduleItems, ...programItemSchedules];
    }, []);
}


export function parseSchedulePage(html: string, courseSeason: CourseSeason): IScheduleItem[] {
    season = courseSeason;
    const $ = cheerio.load(html);
    const hasNoScheduleDoc = Boolean($('.list-group-item').length === 0);
    if (hasNoScheduleDoc) {
        throw new HttpException('No available schedule docs', HttpStatus.NOT_FOUND)
    }
    return $('.panel-info').toArray().reduce((scheduleItems:IScheduleItem[], facultyElement) => { 
        const facultySchedules = parseFacultyItem($, facultyElement);
        return [...scheduleItems, ...facultySchedules];
    }, []);
}