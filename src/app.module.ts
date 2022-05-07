import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseModule } from './modules/course/course.module';
import { ScheduleModule } from './modules/schedule/schedule.module';
import { SystemModule } from './modules/system/system.module';

@Module({
  imports: [CourseModule, ScheduleModule, SystemModule, TypeOrmModule.forRoot()],
  controllers: [],
  providers: [],
})
export class AppModule {}
