import { CourseSeason, EducationLevel } from '../../common/types';

export interface IScheduleItemShort {
  url: string;
  updatedAt: string;  // 'YYYY-MM-DD HH:mm:ss'
}

export interface IScheduleItem extends IScheduleItemShort {
  facultyName: string;
  specialityName: string;
  level: EducationLevel;
  year: 1 | 2 | 3 | 4;
  season: CourseSeason;
}
