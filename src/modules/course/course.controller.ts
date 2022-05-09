import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import {CourseService} from "./course.service";
import {ICourse} from "./types";
import {CourseFeedback} from "../../models/entity/CourseFeedback";
import {CourseFeedbackService} from "./course_feedback.service";
import {CourseFeedbackDto} from "../../models/dto/CourseFeedback.dto";

@Controller('course')
export class CourseController {
  constructor(
    protected readonly service: CourseService,
    protected readonly feedbackService: CourseFeedbackService,
  ) {
  }

  @Get(':code/reviews')
  public async getCourseFeedbacks(@Param('code', ParseIntPipe) code: number): Promise<{ items: CourseFeedbackDto[] }> {
    return {
      items: await this.feedbackService.findAllByCode(code)
    }
  }

  @UsePipes(new ValidationPipe())
  @Post(':code/review')
  public async createCourseFeedback(@Param('code', ParseIntPipe) code: number,
                                    @Body() dto: CourseFeedbackDto): Promise<CourseFeedback> {
    return await this.feedbackService.insert(code, dto);
  }

  @Get(':code')
  public async getCourse(@Param('code', ParseIntPipe) code: number): Promise<ICourse> {
    return this.service.getCourseInfo(code).catch(err => {
      const errorCode = err?.response?.status;
      if (errorCode == 404) {
        throw new NotFoundException('Course not found.');
      } else {
        throw new InternalServerErrorException('Something went wrong');
      }
    });
  }
}
