import {Controller, Get, HttpStatus, Param} from '@nestjs/common';
import { CourseService } from './course.service';
import {ICourse} from "./types";
import {BadCodeException, CourseNotFoundException, DisconnectedException} from "../../common/exceptions";

@Controller('course')
export class CourseController {
  constructor(
    protected readonly service: CourseService,
  ) {}

  @Get(':code')
  public async getCourse(@Param('code') code: number): Promise<ICourse> {
    if(!/\d+/.test(code.toString())) throw new BadCodeException();

    return this.service.parsedCourse(code).catch(err => {
      if (err.response?.status === HttpStatus.NOT_FOUND) throw new CourseNotFoundException();
      if (err.response?.status !== HttpStatus.OK) throw new DisconnectedException();

      throw err;
    });
  }
}
