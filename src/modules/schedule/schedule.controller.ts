import {Controller, Get, HttpStatus, Param, ParseIntPipe} from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import {
  BadSeasonException, BadYearException,
  DisconnectedException,
  SchedulesNotFoundException
} from "../../common/exceptions";

@Controller('schedule')
export class ScheduleController {
  constructor(
    protected readonly service: ScheduleService,
  ) {}

  private static parseSeason(season: string): number {
    const seasons: Record<string, number> = {
      autumn: 1,
      spring: 2,
      summer: 3,
    } as const;

    const numberSeason: number | undefined = seasons[season];

    if(!numberSeason) throw new BadSeasonException();

    return numberSeason;
  }

  private static parseYear(year: number, season: number) {
    return season == 1 ? year : year - 1;
  }

  @Get([':year/:season'])
  public async getSchedule(@Param('year') year: number, @Param('season') season: string) {
    if(!/\d+/.test(year.toString())) throw new BadYearException();

    const parsedSeason: number = ScheduleController.parseSeason(season);
    const parsedYear: number = ScheduleController.parseYear(year, parsedSeason);

    return this.service.parsedTimetable(parsedYear, parsedSeason).catch(err => {
      if (err.response?.status === HttpStatus.NOT_FOUND) throw new SchedulesNotFoundException();
      if (err.response?.status !== HttpStatus.OK) throw new DisconnectedException();

      throw err;
    });
  }
}
