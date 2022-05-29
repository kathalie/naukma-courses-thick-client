import {
  BaseEntity, Column, Entity, PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class CourseFeedback extends BaseEntity {
  @PrimaryGeneratedColumn()
    id: number;

  @Column()
    courseId: number;

  @Column({ type: 'tinyint' })
    rating: number;

  @Column('text', {
    nullable: true,
  })
    text?: string;
}
