import { Injectable } from '@nestjs/common';
import { Faculty } from '../../models/entities/db/Faculty.entity';

@Injectable()
export class FacultyService {
  public async getAll(): Promise<Faculty[]> {
    return Faculty.find();
  }
}
