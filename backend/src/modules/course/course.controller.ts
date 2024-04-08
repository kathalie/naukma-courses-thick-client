import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  InternalServerErrorException,
  Param,
  ParseIntPipe, Post,
  Query
} from '@nestjs/common';
import {CourseService} from './course.service';
import {badCodeOptions, CourseNotFoundException, DisconnectedException} from "../../common/exceptions";
import {AxiosError} from "axios";
import {PageOptionsDto} from "../../common/dtos/page_options.dto";
import {PageDto} from "../../common/dtos/page.dto";
import {Course} from "../../models/entities/Course.entity";
import {Roles} from "../../common/roles/roles.decorator";
import {UserRole} from "../../common/types";

@Controller('courses')
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

  @Get()
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

  @Post()
  @Roles(UserRole.ADMIN)
  public async add(@Body() addCourseDto: {code: number}) {
    try {
      return await this.service.addCourse(addCourseDto.code);
    } catch (err) {
      if ((err as AxiosError).response?.status === HttpStatus.NOT_FOUND) throw new CourseNotFoundException();
      if ((err as AxiosError).response?.status !== HttpStatus.OK) throw new DisconnectedException();

      throw new InternalServerErrorException('Unknown error');
    }
  }

  @Delete(':code')
  @Roles(UserRole.ADMIN)
  public async delete(@Param('code', new ParseIntPipe(badCodeOptions)) code: number) {
    try {
      return await this.service.deleteCourse(code);
    } catch (err) {
      if ((err as AxiosError).response?.status === HttpStatus.NOT_FOUND) throw new CourseNotFoundException();
      if ((err as AxiosError).response?.status !== HttpStatus.OK) throw new DisconnectedException();

      throw new InternalServerErrorException('Unknown error');
    }
  }
}
