import {
    Body,
    Controller,
    DefaultValuePipe,
    Get,
    HttpStatus, InternalServerErrorException,
    Param,
    ParseIntPipe,
    Post,
    Query
} from "@nestjs/common";
import {CourseFeedbackService} from "./course_feedback.service";
import {badCodeOptions, CourseNotFoundException, DisconnectedException} from "../../common/exceptions";
import {CreateFeedbackDto} from "./dto";
import {AxiosError} from "axios";
import {AllFeedbacks} from "./types";

@Controller('course')
export class CourseFeedbackController {
    constructor(protected readonly service: CourseFeedbackService) {
    }

    @Post(':code/review')
    public async create(@Param('code', new ParseIntPipe(badCodeOptions)) code: number, @Body() createFeedbackDto: CreateFeedbackDto) {
        try {
            return await this.service.create(code, createFeedbackDto);
        } catch (err) {
            if ((err as AxiosError).response?.status === HttpStatus.NOT_FOUND) throw new CourseNotFoundException();
            if ((err as AxiosError).response?.status !== HttpStatus.OK) throw new DisconnectedException();

            throw new InternalServerErrorException('Unknown error');
        }
    }

    @Get(':code/reviews')
    public async getAll(
        @Param('code', new ParseIntPipe(badCodeOptions)) code: number,
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
    ): Promise<AllFeedbacks> {
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
            if ((err as AxiosError).response?.status === HttpStatus.NOT_FOUND) throw new CourseNotFoundException();
            if ((err as AxiosError).response?.status !== HttpStatus.OK) throw new DisconnectedException();

            throw new InternalServerErrorException('Unknown error');
        }
    }
}