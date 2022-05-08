import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseModule } from './modules/course/course.module';
import { FacultyModule } from './modules/faculty/faculty.module';
import { ScheduleModule } from './modules/schedule/schedule.module';
import { SystemModule } from './modules/system/system.module';
import { SpecialityModule } from './modules/speciality/speciality.module';

@Module({
  imports: [CourseModule, FacultyModule, SpecialityModule, ScheduleModule, SystemModule, TypeOrmModule.forRoot()],
  controllers: [],
  providers: [],
})
export class AppModule {}
