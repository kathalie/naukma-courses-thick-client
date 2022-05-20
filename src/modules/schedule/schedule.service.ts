import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import axios from 'axios';
import * as cherrio from 'cheerio';
import { BAD_REQUEST_EXCEPTION_TEXT, BASE_URL, NOT_FOUND_EXCEPTION_TEXT } from '../../common/constants';
import { CourseSeason, EducationLevel } from '../../common/types';
import { convertString } from '../../common/util';
import { IScheduleItem, IScheduleItemShort } from './types';

@Injectable()
export class ScheduleService {

	public async getSchedule(year: number, season: string): Promise<IScheduleItemShort[]> {
		this.validateRequest(year, season);

		const seasonNumber: number = this.getSeason(season);
		if (seasonNumber >= 2) {
			year--;
		}
		const resp = await axios.get(`${BASE_URL}/schedule/?year=${year}&season=${seasonNumber}`);
		const page = await resp.data;
		return this.parsePage(page, seasonNumber);
	}

	private validateRequest(year: number, season: string): void {
		if (this.getSeason(season) === -1) {
			throw new BadRequestException(BAD_REQUEST_EXCEPTION_TEXT);
		}
	}

	private getSeason(season: string): number {
		switch (season) {
			case 'autumn':
				return 1;
			case 'spring':
				return 2;
			case 'summer':
				return 3;
			default:
				return -1;
		}
	}

	private parsePage(page: any, seasonNumber: number): IScheduleItem[] {
		const $ = cherrio.load(page);

		const schedule: IScheduleItem[] = [];

		const faculties = $('#schedule-accordion > div ').each((idx, elem) => {
			this.parseFaculty($, elem, schedule, seasonNumber);
		});

		if (schedule.length === 0) {
			throw new NotFoundException(NOT_FOUND_EXCEPTION_TEXT);
		}
		return schedule;
	}

	private parseFaculty($: cherrio.CheerioAPI, faculty: cherrio.Element, schedule: IScheduleItem[], seasonNumber: number) {
		const facultyName: string = $(faculty).find('> div').first().find('a').text();
		const idFaculty = $(faculty).find('div:nth-child(2)').attr().id;
		const accordionIdFaculty = idFaculty + '-accordion';
		const facultySchedule = $(faculty).find(`#${accordionIdFaculty} > div`).each((i, e) => {
			const specialtyHeading = $(e).find('div:nth-child(1) > h4 > a').text().split(' ').filter(word => word.length > 0);
			const educationLevelAbbreviation = specialtyHeading[1].replace(/,+/g, '');
			const year: number = +specialtyHeading[2];
			const educationLevel: EducationLevel = educationLevelAbbreviation === 'БП' ? EducationLevel.BACHELOR : EducationLevel.MASTER;
			const idFacultyYear: string = idFaculty + '-' + ((educationLevel === EducationLevel.BACHELOR) ? 1 : 2) + '-' + year;
			const listOfLevelFaculty = $(e).find(`#${idFacultyYear} > ul > li`);
			listOfLevelFaculty.each((idx, el) => {
				const updateDate = $(el).find('div > span').text();
				const link = $(el).find('div > a').last();
				schedule.push({
					url: link.attr().href,
					updatedAt: this.retriveDate(updateDate.substring(1, updateDate.length - 1)),
					facultyName: convertString(facultyName),
					specialityName: this.retrieveSpecialtyName(convertString(link.text()), educationLevelAbbreviation),
					level: educationLevel,
					year: year,
					season: this.getSeasonByValue(seasonNumber)
				})
			});
		});
	}

	private retriveDate(respondeDate: string): string {
		let date: string = respondeDate.split(' ')[1];
		const time: string = respondeDate.split(' ')[2];
		date = date.split('.').reverse().join('-');
		return date + ' ' + time;
	}

	private retrieveSpecialtyName(specialityName: string, educationLevelAbbreviation: string): string {
		let idx = specialityName.indexOf(educationLevelAbbreviation);
		return idx === -1 ? specialityName : specialityName.substring(0, idx - 1);
	}

	private getSeasonByValue(seasonNumber: number): CourseSeason | undefined {
		switch (seasonNumber) {
			case 1:
				return CourseSeason.AUTUMN;
			case 2:
				return CourseSeason.SPRING;
			case 3:
				return CourseSeason.SUMMER;
			default:
				return undefined;
		}
	}
}
