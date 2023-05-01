import {BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Course} from "./Course.entity";

@Entity()
export class CourseFeedback extends BaseEntity {
    @PrimaryGeneratedColumn({type: 'int', name: 'feedback_id'})
    public feedbackId: number;

    @Column({type: 'tinyint'})
    public rating: number;

    @Column({type: 'text'})
    public text?: string;

    @ManyToOne(() => Course, (course) => course.feedbacks, {cascade: true})
    @JoinColumn()
    public course: Course;
}