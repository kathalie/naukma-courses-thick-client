import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class CourseFeedback extends BaseEntity {
    @PrimaryGeneratedColumn()
    public courseId: number;

    @Column()
    public rating: number;

    @Column()
    public text: string | null;
}