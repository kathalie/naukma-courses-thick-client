import {
    BadRequestException,
    Controller,
    Get,
    InternalServerErrorException,
    NotFoundException,
    Param
} from '@nestjs/common';
import {CourseService} from "./course.service";
import {ICourse} from "./types";

@Controller('course')
export class CourseController {
    constructor(
        protected readonly service: CourseService,
    ) {
    }

    @Get(':code')
    public async getCourse(@Param('code') code: number): Promise<ICourse> {
        return this.service.getCourseInfo(code).catch(err => {
            const errorCode = err.response.status;
            if (errorCode == 404) {
                if (isNaN(code)) {
                    throw new BadRequestException(code + ' id not a number.');
                } else {
                    throw new NotFoundException('Course not found.');
                }
            } else {
                throw new InternalServerErrorException('Something went wrong');
            }
        });
    }
}
