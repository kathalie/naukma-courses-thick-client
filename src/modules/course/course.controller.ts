import { Controller, Get, Param } from '@nestjs/common';
// import { CourseService } from './course.service';

@Controller('course')
export class CourseController {
  constructor(
    protected readonly service: unknown,
  ) {}

  @Get(':code')
  public async getCourse(@Param('code') code: number): Promise<unknown> {
    return undefined;
  }
}
