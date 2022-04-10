import {
    BadRequestException,
    Controller,
    Get,
    InternalServerErrorException,
    NotFoundException,
    Param
} from '@nestjs/common';
import {ScheduleService} from "./schedule.service";
import {IScheduleItem, IScheduleItemShort} from "./types";

@Controller('schedule')
export class ScheduleController {
    constructor(
        protected readonly service: ScheduleService,
    ) {
    }

// /schedule/<year>/<season>
    @Get(':year/:season')
    public async getScheduleInfo(@Param('year') year: number,
                                 @Param('season') season: string): Promise<IScheduleItem[]> {
        let seasonNumber = 0;

        if(season=='autumn'){
            seasonNumber=1;
        }else if(season == 'spring'){
            seasonNumber=2;
        }else if(season == 'summer'){
            seasonNumber=3;
        }
        return this.service.getSheduleInfo(year, seasonNumber).catch(err => {
            const errorCode = err.response.status;
            if (errorCode == 404) {
                if (isNaN(year)) {
                    throw new BadRequestException('Format of input parameter(s) is not right.');
                } else {
                    throw new NotFoundException('Schedule not found.');
                }
            } else {
                throw new InternalServerErrorException('Something went wrong');
            }
        });
    }
}
