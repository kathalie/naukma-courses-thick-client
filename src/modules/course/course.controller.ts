import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { Course } from '../../models/Course.entity';
import { CourseReview } from '../../models/CourseReview.entity';
import { CourseService } from './course.service';
import { CourseReviewDTO } from './dto/course-review.dto';
import { ICourse } from './types';

@Controller('course')
export class CourseController {
  constructor(protected readonly service: CourseService) {}

  @Get('all')
  public async getAllCourses(): Promise<Course[]> {
    return await Course.find();
  }

  @Get(':code')
  public async getCourse(
    @Param('code', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) code: number
  ): Promise<ICourse> {
    return await this.service.getCourseInfo(code);
  }

  @Post(':code/review')
  public async postCourseReview(
    @Param('code', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) code: number,
    @Body(new ValidationPipe()) dto: CourseReviewDTO
  ): Promise<CourseReview> {
    return this.service.saveCourseReview(code, dto);
  }

  @Get(':code/reviews')
  public async getCourseReviews(
    @Param('code', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) code: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10
  ): Promise<{
    code: number;
    items: CourseReviewDTO[];
    averageRating: number;
    ratingCount: number;
  }> {
    return this.service.getReviews(code, { page: page, limit: limit });
  }
}
