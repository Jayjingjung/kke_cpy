import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Project } from './Project';

@Entity('gallery')
export class Gallery {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'text', nullable: true })
  title_lo!: string;

  @Column({ type: 'text', nullable: true })
  title_en!: string;

  @Column({ type: 'text', nullable: true })
  title_zh!: string;

  @Column({ nullable: true })
  category!: string;

  @Column()
  image_url!: string;

  @Column({ nullable: true })
  project_id!: number | null;

  @ManyToOne(() => Project, (p) => p.gallery, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'project_id' })
  project!: Project | null;

  @CreateDateColumn()
  created_at!: Date;
}
