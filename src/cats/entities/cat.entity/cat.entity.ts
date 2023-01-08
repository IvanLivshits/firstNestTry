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
  title: string;

  @Column()
  bread: string;

  @Column({ default: 0 })
  recommendations: number;

  @JoinTable()
  @ManyToMany((type) => Color, (color) => color.cats, {
    cascade: true, // ['insert']
  })
  colors: Color[];
}
