import { Controller, Get, Param } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { IScheduleItemShort } from './types';

@Controller('schedule')
export class ScheduleController {
  constructor(
    protected readonly service: ScheduleService
  ) {}


  @Get('/:year/:season')
  public async getSchedule(@Param('year') year: number, @Param('season') season: string): Promise<IScheduleItemShort[]> {
    return this.service.getSchedule(year, season);
  } 
}
