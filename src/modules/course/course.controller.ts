import { Controller, Get, Param } from '@nestjs/common';
import { CourseService } from './course.service';

@Controller('course')
export class CourseController {
  constructor(protected readonly service: CourseService) {}

  @Get(':code')
  public async getCourse(@Param('code') code: number): Promise<unknown> {
    console.log(code);
    return undefined;
  }
}
