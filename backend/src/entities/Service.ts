import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ServiceBranch } from './ServiceBranch';

@Entity('services')
export class Service {
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

  @Column({ type: 'text', nullable: true })
  description_lo!: string;

  @Column({ type: 'text', nullable: true })
  description_en!: string;

  @Column({ type: 'text', nullable: true })
  description_zh!: string;

  @Column({ nullable: true })
  icon!: string;

  @Column({ nullable: true })
  cover_image!: string;

  @Column({ type: 'int', default: 0 })
  order!: number;

  @OneToMany(() => ServiceBranch, (branch) => branch.service)
  branches!: ServiceBranch[];
}
