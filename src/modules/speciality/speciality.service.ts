import { Injectable } from '@nestjs/common';
import { Speciality } from '../../models/entities/db/Speciality.entity';

@Injectable()
export class SpecialityService {
  public async getAll(): Promise<Speciality[]> {
    return Speciality.find({
      relations: ['faculty'],
    });
  }
}
