import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('executives')
export class Executive {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'text' })
  name_lo!: string;

  @Column({ type: 'text' })
  name_en!: string;

  @Column({ type: 'text' })
  name_zh!: string;

  @Column({ type: 'text' })
  position_lo!: string;

  @Column({ type: 'text' })
  position_en!: string;

  @Column({ type: 'text' })
  position_zh!: string;

  @Column({ type: 'text', nullable: true })
  bio_lo!: string;

  @Column({ type: 'text', nullable: true })
  bio_en!: string;

  @Column({ type: 'text', nullable: true })
  bio_zh!: string;

  @Column({ nullable: true })
  photo_url!: string;

  @Column({ default: 'board' })
  category!: string;

  @Column({ type: 'int', default: 0 })
  order!: number;
}
