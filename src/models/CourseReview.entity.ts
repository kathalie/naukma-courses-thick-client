import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CourseReview extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({
    type: 'integer',
    name: 'course_id',
  })
  public courseId: number;

  @Column({
    type: 'smallint',
  })
  public rating: number;

  @Column({
    type: 'text',
    nullable: true,
  })
  public text?: string;
}
