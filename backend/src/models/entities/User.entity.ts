import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {CourseSeason, UserRole} from "../../common/types";

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public email: string;

    @Column()
    public name: string;

    @Column({type: 'enum', enum: UserRole, default: UserRole.USER})
    public role: UserRole;

    @Column()
    public hash: string;
}