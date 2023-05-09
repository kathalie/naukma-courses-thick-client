import {Controller, Get, HttpStatus, Param, ParseIntPipe} from '@nestjs/common';
import {CourseService} from './course.service';
import {badCodeOptions, CourseNotFoundException, DisconnectedException} from "../../common/exceptions";

@Controller('course')
export class CourseController {
  constructor(
    protected readonly service: CourseService,
  ) {}

  @Get(':code')
  public async getCourse(@Param('code', new ParseIntPipe(badCodeOptions)) code: number) {
    return this.service.getCourseWithStats(code).catch(err => {
      if (err.response?.status === HttpStatus.NOT_FOUND) throw new CourseNotFoundException();
      if (err.response?.status !== HttpStatus.OK) throw new DisconnectedException();

      throw err;
    });
  }
}
