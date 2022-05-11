import {
    Controller,
    Get,
    InternalServerErrorException,
    NotFoundException,
    Param, ParseIntPipe
} from '@nestjs/common';
import { CourseService } from './course.service';
import {ICourse} from "./types";

@Controller('course')
export class CourseController {
  constructor(
    protected readonly service: CourseService,
  ) {}

  @Get(':code')
  public getCourse(@Param('code',ParseIntPipe) code: number): Promise<ICourse> {
      return this.service.getCourseInfo(code).catch(err => {
          const status = err?.response?.status
          if(status == 404) {
              throw new NotFoundException(`Course with the code '${code}' is not found!`)
          } else {
              throw new InternalServerErrorException(`Some error occurred on a serverside.`)
          }
      });
  }

}
