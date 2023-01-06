import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity() //sql table === 'cat'
export class Cat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  bread: string;

  @Column('json', { nullable: true })
  colors: string[];
}
