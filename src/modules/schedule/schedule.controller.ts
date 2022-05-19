import { Controller, Get, HttpStatus, Param, ParseIntPipe } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { IScheduleItemShort } from './types';

@Controller('schedule')
export class ScheduleController {
  constructor(
    protected readonly service: ScheduleService
  ) {}


  @Get('/:year/:season')
  public async getSchedule(@Param('year', new ParseIntPipe({errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE})) year: number, @Param('season') season: string): Promise<IScheduleItemShort[]> {
    return this.service.getSchedule(year, season);
  } 
}
