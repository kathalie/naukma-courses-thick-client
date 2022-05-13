import { BadRequestException, HttpException, HttpStatus, InternalServerErrorException } from "@nestjs/common"
import { Season } from "../modules/schedule/types";
import { CourseSeason, EducationLevel } from './types';

export function getSeasonNumber(season: Season): number {
    switch (season) {
        case 'autumn':
            return 1
        case 'spring':
            return 2
        case 'summer':
            return 3
        default:
            throw new BadRequestException('Wrong season param');
    }
}

export function getCourseSeasonFromSeason(season: Season): CourseSeason {
    switch (season) {
        case 'autumn':
            return CourseSeason.AUTUMN;
        case 'spring':
            return CourseSeason.SPRING;
        case 'summer':
            return CourseSeason.SUMMER;
        default:
            throw new BadRequestException('Wrong season param');
    }
}

export function getEducationLevel(educationLevel: string): EducationLevel {
    switch (educationLevel) {
        case 'МП':
            return EducationLevel.MASTER
        case 'БП':
            return EducationLevel.BACHELOR
        default:
            throw new InternalServerErrorException(`Can't map education level`)
    }
}