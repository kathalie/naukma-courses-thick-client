import { Module } from '@nestjs/common';
import { SpecialityController } from './speciality.controller';
import { SpecialityService } from './speciality.service';

@Module({
  imports: [],
  controllers: [SpecialityController],
  providers: [SpecialityService],
})
export class SpecialityModule {}
