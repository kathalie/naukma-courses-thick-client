import { Module } from '@nestjs/common';
import { CourseModule } from './modules/course/course.module';
import { ScheduleModule } from './modules/schedule/schedule.module';

@Module({
  imports: [CourseModule, ScheduleModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
