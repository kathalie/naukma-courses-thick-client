import { Module } from '@nestjs/common';
import { ScheduleController } from './schedule.controller';

@Module({
  imports: [],
  controllers: [ScheduleController],
  providers: [],
})
export class ScheduleModule {}
