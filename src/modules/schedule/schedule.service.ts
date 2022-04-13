import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { getCourseSeasonFromSeason, getSeasonNumber } from '../../common/mappingHelper';
import { CourseSeason } from '../../common/types';
import { parseSchedulePage } from './schedulePageParser';
import { IScheduleItem, Season } from './types';

@Injectable()
export class ScheduleService {

    async getScheduleInfo(year: number, season: Season): Promise<IScheduleItem[]> {
        const seasonNumber: number = getSeasonNumber(season);
        const courseSeason: CourseSeason = getCourseSeasonFromSeason(season);
        let fixedYear = year;
        if(seasonNumber !== 1){
            fixedYear-=1;
        }
        return axios.get(`https://my.ukma.edu.ua/schedule/?year=${fixedYear}&season=${seasonNumber}`)
            .then(({ data }) => {
                return parseSchedulePage(data, courseSeason);
            })
    }
}
