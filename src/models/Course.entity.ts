import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';
import { CourseSeason, EducationLevel } from '../common/types';
import { ICourse } from '../modules/course/types';

@Entity()
export class Course extends BaseEntity implements ICourse {
  @PrimaryColumn({
    type: 'integer',
  })
  public code: number;

  @Column({
    type: 'varchar',
  })
  public name: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  public description?: string;

  @Column({
    type: 'varchar',
  })
  public facultyName: string; // Назва факультету

  @Column({
    type: 'varchar',
  })
  public departmentName: string; // Назва кафедри

  @Column({
    type: 'enum',
    enum: EducationLevel,
  })
  public level: EducationLevel;

  @Column({
    type: 'smallint',
  })
  public year: number;

  @Column({
    type: 'enum',
    enum: CourseSeason,
    array: true,
  })
  seasons: CourseSeason[];

  @Column({
    type: 'float4',
    nullable: true,
  })
  creditsAmount?: number;

  @Column({
    type: 'float4',
    nullable: true,
  })
  hoursAmount?: number;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  teacherName?: string;
}
