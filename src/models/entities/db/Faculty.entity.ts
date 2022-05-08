import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Speciality } from './Speciality.entity';

@Entity()
export class Faculty extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @Column({
    name: 'short_name',
  })
  public shortName: string;

  @OneToMany(() => Speciality, (spec) => spec.faculty)
  public specialities: Speciality[];
}
