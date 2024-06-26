import {Injectable, NotFoundException} from "@nestjs/common";
import {CreateFeedbackDto, UpdateFeedbackDto} from "./dto";
import {CourseFeedback} from "../../models/entities/CourseFeedback.entity";
import {CourseService} from "../course/course.service";

@Injectable()
export class CourseFeedbackService {

    public async create(code: number, feedbackDto: CreateFeedbackDto): Promise<CourseFeedback> {
        let courseFeedback = new CourseFeedback();

        courseFeedback.course = await new CourseService().getCourse(code);
        courseFeedback.rating = feedbackDto.rating;
        courseFeedback.text = feedbackDto.text;

        return await CourseFeedback.save(courseFeedback);
    }

    public async update(feedbackId: number, feedbackDto: UpdateFeedbackDto): Promise<CourseFeedback> {
        return await CourseFeedback.save({feedbackId, ...feedbackDto});
    }

    public async delete(feedbackId: number): Promise<CourseFeedback> {
        const feedbackToRemove = await CourseFeedback.findOne({
            where: [{feedbackId}]
        });

        if (!feedbackToRemove) {
            throw new NotFoundException('Feedback not found');
        }

        return await CourseFeedback.remove(feedbackToRemove);
    }

    public async getOne(feedbackId: number): Promise<CourseFeedback> {
        const feedback = await CourseFeedback.findOne({
            where: [{feedbackId}]
        });

        if (!feedback) {
            throw new NotFoundException('Feedback not found');
        }

        return feedback;
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