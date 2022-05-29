import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { Season } from './types';

@Controller('schedule')
export class ScheduleController {
  constructor(
    protected readonly service: ScheduleService,
  ) {}

  @Get(':year/:season')
  getScheduleInfo(
    @Param('year', ParseIntPipe) year: number,
    @Param('season') season: Season
  ){
    return this.service.getScheduleInfo(year, season);
  }
}
