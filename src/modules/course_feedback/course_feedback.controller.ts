import {
    Body,
    Controller,
    DefaultValuePipe, Delete,
    Get,
    HttpStatus, InternalServerErrorException,
    Param,
    ParseIntPipe,
    Post, Put,
    Query
} from "@nestjs/common";
import {CourseFeedbackService} from "./course_feedback.service";
import {badCodeOptions, CourseNotFoundException, DisconnectedException} from "../../common/exceptions";
import {CreateFeedbackDto, UpdateFeedbackDto} from "./dto";
import {AxiosError} from "axios";
import {AllFeedbacks} from "./types";

@Controller()
export class CourseFeedbackController {
    constructor(protected readonly service: CourseFeedbackService) {
    }

    @Post('course/:code/review')
    public async create(
        @Param('code', new ParseIntPipe(badCodeOptions)) code: number, @Body() createFeedbackDto: CreateFeedbackDto) {
        try {
            return await this.service.create(code, createFeedbackDto);
        } catch (err) {
            if ((err as AxiosError).response?.status === HttpStatus.NOT_FOUND) throw new CourseNotFoundException();
            if ((err as AxiosError).response?.status !== HttpStatus.OK) throw new DisconnectedException();

            throw new InternalServerErrorException('Unknown error');
        }
    }

    @Put('/review/:feedbackId')
    public async update(@Param('feedbackId', new ParseIntPipe(badCodeOptions)) id: number, @Body() updateFeedbackDto: UpdateFeedbackDto) {
        try {
            return await this.service.update(id, updateFeedbackDto);
        } catch (err) {
            if ((err as AxiosError).response?.status === HttpStatus.NOT_FOUND) throw new CourseNotFoundException();
            if ((err as AxiosError).response?.status !== HttpStatus.OK) throw new DisconnectedException();

            throw new InternalServerErrorException('Unknown error');
        }
    }

    @Delete('/review/:feedbackId')
    public async delete(@Param('feedbackId', new ParseIntPipe(badCodeOptions)) code: number) {
        try {
            return await this.service.delete(code);
        } catch (err) {
            if ((err as AxiosError).response?.status === HttpStatus.NOT_FOUND) throw new CourseNotFoundException();
            if ((err as AxiosError).response?.status !== HttpStatus.OK) throw new DisconnectedException();

            throw new InternalServerErrorException('Unknown error');
        }
    }

    @Get('/review/:feedbackId')
    public async getOne(@Param('feedbackId', new ParseIntPipe(badCodeOptions)) code: number) {
        try {
            return await this.service.getOne(code);
        } catch (err) {
            if ((err as AxiosError).response?.status === HttpStatus.NOT_FOUND) throw new CourseNotFoundException();
            if ((err as AxiosError).response?.status !== HttpStatus.OK) throw new DisconnectedException();

            throw new InternalServerErrorException('Unknown error');
        }
    }

    @Get('course/:code/reviews')
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