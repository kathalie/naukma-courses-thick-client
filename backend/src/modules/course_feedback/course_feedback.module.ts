import {Module} from '@nestjs/common';
import {CourseFeedbackController} from "./course_feedback.controller";
import {CourseFeedbackService} from "./course_feedback.service";

@Module({
    imports: [],
    controllers: [CourseFeedbackController],
    providers: [CourseFeedbackService],
})
export class CourseFeedbackModule {
}
