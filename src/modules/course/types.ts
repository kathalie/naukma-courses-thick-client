import { CourseSeason, EducationLevel } from '../../common/types';

export interface ICourse {
  code: number;
  name: string;
  description?: string;
  facultyName: string; // Назва факультету
  departmentName: string; // Назва кафедри
  level: EducationLevel;
  year: number;
  seasons: CourseSeason[];
  creditsAmount?: number;
  hoursAmount?: number;
  teacherName?: string;
}
