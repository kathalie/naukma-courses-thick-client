import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {UserRole} from "../../common/types";

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public email: string;

    @Column()
    public name: string;

    @Column({type: 'set', enum: UserRole, default: [UserRole.USER]})
    public roles: UserRole[];

    @Column()
    public hash: string;
}