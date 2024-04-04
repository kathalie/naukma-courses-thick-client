import {
  Controller,
  DefaultValuePipe,
  Get,
  HttpStatus,
  InternalServerErrorException,
  Param,
  ParseIntPipe,
  Query
} from '@nestjs/common';
import {CourseService} from './course.service';
import {badCodeOptions, CourseNotFoundException, DisconnectedException} from "../../common/exceptions";
import {AllFeedbacks} from "../course_feedback/types";
import {AxiosError} from "axios";
import {PageOptionsDto} from "../../common/dtos/page_options.dto";
import {PageDto} from "../../common/dtos/page.dto";
import {Course} from "../../models/entities/Course.entity";

@Controller('')
export class CourseController {
  constructor(
    protected readonly service: CourseService,
  ) {}

  @Get('course/:code')
  public async getCourse(@Param('code', new ParseIntPipe(badCodeOptions)) code: number) {
    return this.service.getCourseWithStats(code).catch(err => {
      if (err.response?.status === HttpStatus.NOT_FOUND) throw new CourseNotFoundException();
      if (err.response?.status !== HttpStatus.OK) throw new DisconnectedException();

      throw err;
    });
  }

  @Get('courses')
  public async getAll(
      @Query() pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<Course>> {
    try {
      return this.service.getAllCourses(pageOptionsDto);
    } catch (err) {
      if ((err as AxiosError).response?.status === HttpStatus.NOT_FOUND) throw new CourseNotFoundException();
      if ((err as AxiosError).response?.status !== HttpStatus.OK) throw new DisconnectedException();

      throw new InternalServerErrorException('Unknown error');
    }
  }
}
