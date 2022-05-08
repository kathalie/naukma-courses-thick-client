import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { DegreeLevel } from '../../enums/DegreeLevel';
import { Faculty } from './Faculty.entity';

@Entity()
export class Speciality extends BaseEntity {
  // Fields
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public code: string;

  @Column()
  public name: string;

  @Column({
    type: 'enum',
    enum: DegreeLevel,
  })
  public level: DegreeLevel;

  @Column({
    name: 'faculty_id',
  })
  public facultyId: number;

  // Relations
  @ManyToOne(() => Faculty, (faculty) => faculty.specialities)
  @JoinColumn({
    name: 'faculty_id',
  })
  public faculty: Faculty;
}
