import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('settings')
export class Setting {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  key!: string;

  @Column({ type: 'text', nullable: true })
  value_lo!: string;

  @Column({ type: 'text', nullable: true })
  value_en!: string;

  @Column({ type: 'text', nullable: true })
  value_zh!: string;
}
