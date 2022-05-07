import {
    Controller,
    Get,
    InternalServerErrorException,
    NotFoundException,
    Param, ParseIntPipe
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
    public async getCourse(@Param('code', ParseIntPipe) code: number): Promise<ICourse> {
        return this.service.getCourseInfo(code).catch(err => {
            const errorCode = err?.response?.status;
            if (errorCode == 404) {
                throw new NotFoundException('Course not found.');
            } else {
                throw new InternalServerErrorException('Something went wrong');
            }
        });
    }
}
