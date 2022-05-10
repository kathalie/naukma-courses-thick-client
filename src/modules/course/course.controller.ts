import {Controller, Get, InternalServerErrorException, NotFoundException, Param, ParseIntPipe} from '@nestjs/common';
import { CourseService } from './course.service';
import {ICourse} from "./types";

@Controller('course')
export class CourseController {
  constructor(
    protected readonly service: CourseService,
  ) {}

  @Get(':code')
  public getCourse(@Param('code', ParseIntPipe) code: number): Promise<ICourse> {
    return this.service.getCourseData(code).catch(error => {
      if (error?.response?.status == 404) {
        throw new NotFoundException('There is no course with such code.');
      } else {
        throw new InternalServerErrorException('Internal server error.');
      }
    });
  }
}
