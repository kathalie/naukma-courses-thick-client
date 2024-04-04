import {
  BadRequestException,
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  ParseIntPipe,
  ValidationPipe
} from '@nestjs/common';
import {ScheduleService} from './schedule.service';
import {DisconnectedException} from "../../common/exceptions";

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

    if(!numberSeason) throw new BadRequestException('Season should be "spring", "summer" or "autumn"!');

    return numberSeason;
  }

  private static parseYear(year: number, season: number) {
    return season === 1 ? year : year - 1;
  }

  @Get([':year/:season'])
  public async getSchedule(
      @Param('year', new ParseIntPipe({
        exceptionFactory: (_) => 'Year should be a number!',
      })) year: number,
      @Param('season') season: string
  ) {
    const parsedSeason: number = ScheduleController.parseSeason(season);
    const parsedYear: number = ScheduleController.parseYear(year, parsedSeason);

    return this.service.getParsedTimetable(parsedYear, parsedSeason).catch(err => {
      if (err.response?.status === HttpStatus.NOT_FOUND) throw new NotFoundException('Schedules were not found.');
      if (err.response?.status !== HttpStatus.OK) throw new DisconnectedException();

      throw err;
    });
  }
}
