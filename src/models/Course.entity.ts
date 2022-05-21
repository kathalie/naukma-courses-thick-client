import { BaseEntity, Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { CourseSeason, EducationLevel } from '../common/types';
import { ICourse } from '../modules/course/types';

@Entity()
export class Course extends BaseEntity implements ICourse {
	@PrimaryColumn({
		type: "integer"
	})
	public code: number;

	@Column({
		type: "varchar",
		length: 100
	})
	public name: string;

	@Column({
		type: "text",
		nullable: true
	})
	public description?: string;

	@Column({
		type: "varchar",
		length: 50
	})
	public facultyName: string;  // Назва факультету

	@Column({
		type: "varchar",
		length: 50
	})
	public departmentName: string; // Назва кафедри


	@Column({
		type: "enum",
		enum: EducationLevel
	})
	public level: EducationLevel;

	@Column({
		type: "smallint"
	})
	public year: number;

	@Column({
		type: "enum",
		enum: CourseSeason,
		array: true
	})
	seasons: CourseSeason[];

	@Column({
		type: "float4",
		nullable: true
	})
	creditsAmount?: number;

	@Column({
		type: "float4",
		nullable: true
	})
	hoursAmount?: number;
	@Column({
		type: "varchar",
		length: 50,
		nullable: true
	})
	teacherName?: string;

}