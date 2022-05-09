import { Module } from '@nestjs/common';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import {CourseFeedbackService} from "./course_feedback.service";

@Module({
  imports: [],
  controllers: [CourseController],
  providers: [CourseService,CourseFeedbackService],
})
export class CourseModule {}
