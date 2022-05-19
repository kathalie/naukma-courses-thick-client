import { Controller, Get, HttpStatus, Param, ParseIntPipe } from '@nestjs/common';
import { CourseService } from './course.service';
import { ICourse } from './types';

@Controller('course')
export class CourseController {
  constructor(
    protected readonly service: CourseService,
  ) {}

  @Get(':code')
  public async getCourse(@Param('code', new ParseIntPipe({errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE})) code: number): Promise<ICourse> {
    return await this.service.getCourseInfo(code);
  }
}
