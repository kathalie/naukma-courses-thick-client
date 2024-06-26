import { CourseSeason, EducationLevel } from '../../common/types';

export interface ICourse {
  code: number;
  name: string;
  description?: string;
  facultyName: string;  // Назва факультету
  departmentName: string; // Назва кафедри
  level: EducationLevel;
  year: 1 | 2 | 3 | 4;
  seasons: CourseSeason[];
  creditsAmount?: number;
  hoursAmount?: number;
  teacherName?: string;
}

export interface CourseWithRating extends ICourse {
  rating?: number;
}