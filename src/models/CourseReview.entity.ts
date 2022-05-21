import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CourseReview extends BaseEntity {

	@PrimaryGeneratedColumn()
	public id: number = 0;

	@Column({
		type: "integer",
		name: "course_id"
	})
	public courseId: number = 0;

	@Column({
		type: "smallint"
	})
	public rating: number = 1;

	@Column({
		type: "text",
		nullable: true
	})
	public text?: string = "";

}