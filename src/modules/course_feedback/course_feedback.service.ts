import {Injectable} from "@nestjs/common";
import {CreateFeedbackDto} from "./dto";
import {CourseFeedback} from "../../models/entities/CourseFeedback.entity";
import {CourseController} from "../course/course.controller";
import {CourseService} from "../course/course.service";
import {Course} from "../../models/entities/Course.entity";

@Injectable()
export class CourseFeedbackService {
    public async create(code: number, feedbackDto: CreateFeedbackDto): Promise<CourseFeedback> {
        let courseFeedback = new CourseFeedback();

        courseFeedback.course = await new CourseService().getCourse(code);
        courseFeedback.rating = feedbackDto.rating;
        courseFeedback.text = feedbackDto.text;

        return await CourseFeedback.save(courseFeedback);
    }

    public async getAllFeedbacks(code: number): Promise<CreateFeedbackDto[]> {
        const feedbacks = await CourseFeedback.find();

        return feedbacks.map(feedback => {
            return {
                rating: feedback.rating,
                text: feedback.text,
            } as CreateFeedbackDto
        });
    }

    public async getAverageRating(code: number): Promise<number> {
        return 0;
    }

    public async getRatingCount(code: number): Promise<number> {
        return 0;
    }
}