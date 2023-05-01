import {Body, Controller, Get, HttpStatus, Param, Post} from '@nestjs/common';
import { CourseService } from './course.service';
import {ICourse} from "./types";
import {BadCodeException, CourseNotFoundException, DisconnectedException} from "../../common/exceptions";
import {validateCode} from "../../utils/validators";

@Controller('course')
export class CourseController {
  constructor(
    protected readonly service: CourseService,
  ) {}

  @Get(':code')
  public async getCourse(@Param('code') code: number) {
    validateCode(code);

    return this.service.getCourseWithStats(code).catch(err => {
      if (err.response?.status === HttpStatus.NOT_FOUND) throw new CourseNotFoundException();
      if (err.response?.status !== HttpStatus.OK) throw new DisconnectedException();

      throw err;
    });
  }

  // @Get(':code/reviews')
  // public async getCourseReviews(@Param('code') code: number): Promise<IReview[]> {
  //
  // }

  // @Post(':code/reviews')
  // public async createCourseReview(@Body() review: IReview) {
  //
  // }
}
