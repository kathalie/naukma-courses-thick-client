import { Controller, Get } from '@nestjs/common';
import { FacultyService } from './faculty.service';
import type { Faculty } from '../../models/entities/db/Faculty.entity';

@Controller('faculty')
export class FacultyController {
  constructor(protected readonly service: FacultyService) {}

  @Get()
  public async getAll(): Promise<{ items: Faculty[] }> {
    return {
      items: await this.service.getAll(),
    };
  }
}
