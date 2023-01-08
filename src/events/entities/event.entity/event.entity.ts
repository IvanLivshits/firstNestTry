import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Index(['id', 'name'])
@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column()
  name: string;

  @Column('json')
  payload: Record<string, any>;
}
