import {
    BadRequestException,
    Controller,
    Get, HttpException,
    InternalServerErrorException,
    NotFoundException,
    Param
} from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import {IScheduleItem} from "./types";

@Controller('schedule')
export class ScheduleController {
  constructor(
    protected readonly service: ScheduleService,
  ) {}

  @Get(':year/:season')
  public getCourse(@Param('year') year: number,
                   @Param('season') season: string,): Promise<IScheduleItem[]> {
      if(season != "autumn" && season != "spring" && season != "summer"){
          throw new BadRequestException(`${season} is an incorrect season!`)
      }
      if(isNaN(year)){
          throw new BadRequestException(`Year ${year} is not not a number!`)
      }
      return this.service.getSchedulesInfo(year,season).then(value => {
          if(value.length==0){
              throw new HttpException({ status: 404 },404)
          }
          return value
      }).catch(err => {
          const status = err?.response?.status
          if(status == 404){
              throw new NotFoundException(`Schedules for year ${year} and season ${season} not found!`)
          }else {
              throw new InternalServerErrorException(`Some error occurred on a serverside.`)
          }
      })
  }

}
