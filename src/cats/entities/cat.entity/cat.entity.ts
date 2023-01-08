import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Color } from '../color.entity/color.entity';

@Entity() //sql table === 'cat'
export class Cat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  bread: string;

  @JoinTable()
  @ManyToMany((type) => Color, (color) => color.cats, {
    cascade: true, // ['insert']
  })
  colors: Color[];
}
