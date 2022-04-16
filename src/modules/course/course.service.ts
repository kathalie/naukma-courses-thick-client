import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { BAD_REQUEST_EXCEPTION_TEXT, BASE_URL, NOT_FOUND_EXCEPTION_TEXT } from '../../common/constants';
import { CourseSeason, EducationLevel } from '../../common/types';
import { convertString } from '../../common/util';
import { ICourse } from './types';

@Injectable()
export class CourseService {

  public async getCourseInfo(code: number): Promise<ICourse> {
    this.validateRequest(code);

    const response = await axios.get(`${BASE_URL}/course/${code}`)
      .catch(err => {
        if (err.response.status === 404) {
          throw new NotFoundException(NOT_FOUND_EXCEPTION_TEXT);
        } else {
          throw new InternalServerErrorException();
        }
      });

    const body = await response.data;
    return this.parsePage(body);
  }

  private validateRequest(code: number): void {
    if (isNaN(code)) {
      throw new BadRequestException(BAD_REQUEST_EXCEPTION_TEXT);
    }
  }

  public parsePage(data: any): ICourse {
    const $ = cheerio.load(data);
    const code: number = +$(`${this.appendTd(this.getTbodyTr(1, 1))}`).text();
    const name: string = $('.breadcrumb > .active').text();
    const facultyName: string = $(`${this.appendTd(this.getTbodyTr(1, 3))}`).text();
    const departmentName: string = $(`${this.appendTd(this.getTbodyTr(1, 4))}`).text();
    const level: string = $(`${this.appendTd(this.getTbodyTr(1, 5))}`).text();
    const year = +$(`${this.appendTd(this.getTbodyTr(1, 2))} > span:nth-child(3)`)
      .text()
      .split(' ')[0];
    const creditsAmount = +$(`${this.appendTd(this.getTbodyTr(1, 2))} > span:nth-child(1)`)
      .text()
      .split(' ')[0];
    const hoursAmount = +$(`${this.appendTd(this.getTbodyTr(1, 2))} > span:nth-child(2)`)
      .text()
      .split(' ')[0];
    const possibleTeacher = $(`${this.getTbodyTr(1, 7)}`);
    let teacherName = undefined;
    if ($(possibleTeacher).find("th").text() === 'Викладач') {
      teacherName = convertString($(possibleTeacher).find('td').text());
    }

    let desc: string | undefined = $(`#course-card--${code}--info`).text();
    desc = desc === "" ? undefined : convertString(desc);
    const seasons: CourseSeason[] = [];
    $(`${this.getTbody(2)}`).each((idx, elem) => {
      const text = $(elem).find('th').text().trim().split("\t").forEach(season => {
        if (season === 'Осінь')
          seasons.push(CourseSeason.AUTUMN);
        else if (season === 'Весна')
          seasons.push(CourseSeason.SPRING);
        else if (season === 'Літо')
          seasons.push(CourseSeason.SUMMER);
      })
    });

    return {
      code: code,
      name: name,
      description: desc,
      facultyName: facultyName,
      departmentName: departmentName,
      level: level === 'Бакалавр' ? EducationLevel.BACHELOR : EducationLevel.MASTER,
      year: year,
      seasons: seasons,
      creditsAmount: creditsAmount,
      hoursAmount: hoursAmount,
      teacherName: teacherName,
    };
  }

  private getTbody(tbody: number): string {
    return `#w0 > table > tbody:nth-child(${tbody})`;
  }

  private getTbodyTr(tbody: number, tr: number) {
    return `${this.getTbody(tbody)} >  tr:nth-child(${tr})`;
  }

  private appendTd(path: string): string {
    return `${path} > td`;
  }
}
