import { Controller, Get, Param } from '@nestjs/common';
import { CourseService } from './course.service';
import { ICourse } from './types';

@Controller('course')
export class CourseController {
  constructor(
    protected readonly service: CourseService,
  ) {}

  @Get(':code')
  public async getCourse(@Param('code') code: number): Promise<ICourse> {
    return await this.service.getCourseInfo(code);
  }
}
