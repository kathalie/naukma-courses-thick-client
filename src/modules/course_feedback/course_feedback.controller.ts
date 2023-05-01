import {Body, Controller, Get, HttpStatus, Param, Post} from "@nestjs/common";
import {CourseFeedbackService} from "./course_feedback.service";
import {CourseNotFoundException, DisconnectedException} from "../../common/exceptions";
import {validateCode} from "../../utils/validators";
import {AllFeedbacksDto, CreateFeedbackDto} from "./dto";

@Controller('course')
export class CourseFeedbackController {
    constructor(protected readonly service: CourseFeedbackService) {
    }

    @Post(':code/review')
    public async create(@Param('code') code: number, @Body() createFeedbackDto: CreateFeedbackDto) {
        validateCode(code);

        try {
            return this.service.create(code, createFeedbackDto);
        } catch (err) {
            if (err.response?.status === HttpStatus.NOT_FOUND) throw new CourseNotFoundException();
            if (err.response?.status !== HttpStatus.OK) throw new DisconnectedException();
        }
    }

    @Get(':code/reviews')
    public async getAll(@Param('code') code: number): Promise<AllFeedbacksDto> {
        validateCode(code);

        try {
            const items = await this.service.getAllFeedbacks(code);
            const averageRating = await this.service.getAverageRating(code);
            const ratingCount = await this.service.getRatingCount(code);

            return {
                items: items,
                rating: averageRating,
                ratingCount: ratingCount
            }
        } catch (err) {
            if (err.response?.status === HttpStatus.NOT_FOUND) throw new CourseNotFoundException();
            if (err.response?.status !== HttpStatus.OK) throw new DisconnectedException();
        }
    }
}