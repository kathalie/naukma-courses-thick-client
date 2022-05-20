import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseModule } from './modules/course/course.module';
import { ScheduleModule } from './modules/schedule/schedule.module';

@Module({
  imports: [
    CourseModule, 
    ScheduleModule,
    TypeOrmModule.forRoot(),
    ConfigModule.forRoot()
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
