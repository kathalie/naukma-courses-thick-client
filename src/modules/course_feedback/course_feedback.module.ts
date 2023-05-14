import {Module} from '@nestjs/common';
import {CourseFeedbackController} from "./course_feedback.controller";
import {CourseFeedbackService} from "./course_feedback.service";
import {CourseService} from "../course/course.service";

@Module({
    imports: [],
    controllers: [CourseFeedbackController],
    providers: [CourseFeedbackService, CourseService],
})
export class CourseFeedbackModule {
}
