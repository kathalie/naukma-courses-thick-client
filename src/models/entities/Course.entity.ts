import {BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {CourseSeason, EducationLevel} from "../../common/types";
import {CourseFeedback} from "./CourseFeedback.entity";

@Entity()
export class Course extends BaseEntity {
    @PrimaryGeneratedColumn()
    public code: number;

    @Column()
    public name: string;

    @Column({type: 'text'})
    public description?: string;

    @Column({name: 'faculty_name'})
    public facultyName: string;

    @Column({name: 'department_name'})
    public departmentName: string;

    @Column({type: 'enum', enum: EducationLevel, enumName: "course_level_enum"})
    public level: EducationLevel;

    @Column({type: 'tinyint'})
    public year: 1 | 2 | 3 | 4;

    @Column({type: 'set', enum: CourseSeason,})
    public seasons: CourseSeason[];

    @Column({name: 'credits_amount'})
    public creditsAmount?: number;

    @Column({name: 'hours_amount'})
    public hoursAmount?: number;

    @Column({name: 'teacher_name'})
    public teacherName?: string;

    @OneToMany(() => CourseFeedback, (feedback) => feedback.course)
    public feedbacks?: CourseFeedback[];
}