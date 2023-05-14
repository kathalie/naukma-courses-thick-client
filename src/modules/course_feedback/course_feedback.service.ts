import {Injectable} from "@nestjs/common";
import {CreateFeedbackDto} from "./dto";
import {CourseFeedback} from "../../models/entities/CourseFeedback.entity";
import {CourseService} from "../course/course.service";

@Injectable()
export class CourseFeedbackService {
    constructor(private courseService: CourseService) {
    }

    public async create(code: number, feedbackDto: CreateFeedbackDto): Promise<CourseFeedback> {
        let courseFeedback = new CourseFeedback();

        courseFeedback.course = await this.courseService.getCourse(code);
        courseFeedback.rating = feedbackDto.rating;
        courseFeedback.text = feedbackDto.text;

        return await CourseFeedback.save(courseFeedback);
    }

    public async getAllFeedbacks(code: number): Promise<CreateFeedbackDto[]> {
        const feedbacks = await CourseFeedback.createQueryBuilder('feedbacks')
            .select()
            .where('feedbacks.courseCode = :code', {code})
            .getMany();

        return feedbacks.map(feedback => {
            return {
                rating: feedback.rating,
                text: feedback.text,
            } as CreateFeedbackDto
        });
    }

    public async getAverageRating(code: number): Promise<number> {
        const res =  await CourseFeedback.createQueryBuilder('_course_feedback')
            .select('ROUND(AVG(rating), 2)', 'average_rating')
            .where('_course_feedback.courseCode = :code', {code})
            .getRawOne();

        return +res.average_rating;
    }

    public async getRatingCount(code: number): Promise<number> {
        const res = await CourseFeedback.createQueryBuilder('_course_feedback')
            .select('COUNT(rating)', 'feedback_count')
            .where('_course_feedback.courseCode = :code', {code})
            .getRawOne();

        return +res.feedback_count;
    }
}