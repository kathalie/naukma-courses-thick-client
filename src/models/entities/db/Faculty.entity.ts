import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Faculty {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @Column({
    name: 'short_name',
  })
  public shortName: string;
}
