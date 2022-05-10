import {
    BadRequestException,
    Controller,
    Get, HttpException,
    InternalServerErrorException,
    NotFoundException,
    Param,
    ParseIntPipe
} from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import {IScheduleItem} from "./types";
import {isWeakMap} from "util/types";

@Controller('schedule')
export class ScheduleController {
  constructor(
    protected readonly service: ScheduleService,
  ) {}

  @Get(':year/:season')
  public async getSchedule(@Param('year', ParseIntPipe) year: number, @Param('season') season: string)
      : Promise<IScheduleItem[]> {

    if(season != "autumn" && season != "spring" && season != "summer")
        throw new BadRequestException("Incorrect season.");

    return this.service.getScheduleData(year, season)
        .then((response) => {
            if (response.length == 0)
                throw new HttpException({status: 404}, 404);
            return response;
        }).catch(error => {
          if (error?.response?.status == 404) {
            throw new NotFoundException('There is no schedule with such parameters.');
          } else {
            throw new InternalServerErrorException('Internal server error.');
          }
        });
    }
}
