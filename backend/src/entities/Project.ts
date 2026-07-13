import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Gallery } from './Gallery';

@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  slug!: string;

  @Column({ type: 'text' })
  title_lo!: string;

  @Column({ type: 'text' })
  title_en!: string;

  @Column({ type: 'text' })
  title_zh!: string;

  @Column({ nullable: true })
  category!: string;

  @Column({ default: 'ongoing' })
  status!: string;

  @Column({ type: 'text', nullable: true })
  description_lo!: string;

  @Column({ type: 'text', nullable: true })
  description_en!: string;

  @Column({ type: 'text', nullable: true })
  description_zh!: string;

  @Column({ type: 'date', nullable: true })
  start_date!: Date;

  @Column({ type: 'date', nullable: true })
  end_date!: Date;

  @Column({ nullable: true })
  location!: string;

  @Column({ nullable: true })
  cover_image!: string;

  @OneToMany(() => Gallery, (g) => g.project)
  gallery!: Gallery[];
}
