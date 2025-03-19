import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('sequences')
export class SequenceEntity {
  @PrimaryColumn()
  name: string;

  @Column()
  year: number;

  @Column()
  currentValue: number;
}
