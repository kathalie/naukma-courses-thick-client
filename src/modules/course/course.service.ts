import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { IPaginationOptions } from 'nestjs-typeorm-paginate';
import { BASE_URL, NOT_FOUND_EXCEPTION_TEXT } from '../../common/constants';
import { CourseSeason, EducationLevel } from '../../common/types';
import { convertString } from '../../common/util';
import { Course } from '../../models/Course.entity';
import { CourseReview } from '../../models/CourseReview.entity';
import { CourseReviewDTO } from './dto/course-review.dto';
import { ICourse } from './types';

@Injectable()
export class CourseService {
  public async getCourseInfo(code: number): Promise<ICourse> {
    const course: Course | undefined = await Course.findOne({
      where: {
        code: code,
      },
    });
    if (course !== undefined) {
      return course;
    }
    const parsedCourse: ICourse = await this.getParsedCourseInfo(code);
    const courseToSave: Course = Course.create({
      ...parsedCourse,
    });
    try {
      return await courseToSave.save();
    } catch (e) {
      throw new InternalServerErrorException('An error occured while saving to database');
    }
  }

  public async getParsedCourseInfo(code: number): Promise<ICourse> {
    const response = await axios.get(`${BASE_URL}/course/${code}`).catch((err) => {
      if (err?.response?.status === 404) {
        throw new NotFoundException(NOT_FOUND_EXCEPTION_TEXT);
      } else {
        throw new InternalServerErrorException();
      }
    });

    const body = await response.data;
    return this.parsePage(body);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    if ($(possibleTeacher).find('th').text() === 'Викладач') {
      teacherName = convertString($(possibleTeacher).find('td').text());
    }

    let desc: string | undefined = $(`#course-card--${code}--info`).text();
    desc = desc === '' ? undefined : convertString(desc);
    const seasons: CourseSeason[] = [];
    $(`${this.getTbody(2)}`).each((idx, elem) => {
      $(elem)
        .find('th')
        .text()
        .trim()
        .split('\t')
        .forEach((season) => {
          if (season === 'Осінь') seasons.push(CourseSeason.AUTUMN);
          else if (season === 'Весна') seasons.push(CourseSeason.SPRING);
          else if (season === 'Літо') seasons.push(CourseSeason.SUMMER);
        });
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

  public async saveCourseReview(code: number, dto: CourseReviewDTO): Promise<CourseReview> {
    const courseReview = CourseReview.create();
    courseReview.courseId = code;
    courseReview.rating = dto.rating;
    courseReview.text = dto.text;
    return await courseReview.save();
  }

  public async getReviews(
    code: number,
    options: IPaginationOptions
  ): Promise<{
    code: number;
    items: CourseReviewDTO[];
    averageRating: number;
    ratingCount: number;
  }> {
    const [reviews]: [CourseReview[], number] = await CourseReview.findAndCount({
      where: {
        courseId: code,
      },
      take: +options.limit,
      skip: (+options.page - 1) * +options.limit,
    });
    const averageRating = reviews.reduce((sum: number, { rating }: { rating: number }) => sum + rating, 0);
    const reviewsDTO: CourseReviewDTO[] = reviews.map((review) => {
      return {
        rating: review.rating,
        text: review.text,
      };
    });
    return {
      code: code,
      items: reviewsDTO,
      averageRating: averageRating / reviewsDTO.length,
      ratingCount: reviewsDTO.length,
    };
  }
}
