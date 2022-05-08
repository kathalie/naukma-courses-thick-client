import { Controller, Get } from '@nestjs/common';
import { SpecialityService } from './speciality.service';
import type { Speciality } from '../../models/entities/db/Speciality.entity';

@Controller('speciality')
export class SpecialityController {
  constructor(protected readonly service: SpecialityService) {}

  @Get()
  public async getAll(): Promise<{ items: Speciality[] }> {
    return {
      items: await this.service.getAll(),
    };
  }
}
