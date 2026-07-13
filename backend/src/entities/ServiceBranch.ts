import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Service } from './Service';

@Entity('service_branches')
export class ServiceBranch {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  service_id!: number;

  @ManyToOne(() => Service, (service) => service.branches, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'service_id' })
  service!: Service;

  @Column({ type: 'text' })
  name_lo!: string;

  @Column({ type: 'text' })
  name_en!: string;

  @Column({ type: 'text' })
  name_zh!: string;

  @Column({ type: 'text', nullable: true })
  address_lo!: string;

  @Column({ type: 'text', nullable: true })
  address_en!: string;

  @Column({ type: 'text', nullable: true })
  address_zh!: string;

  @Column({ type: 'decimal', precision: 10, scale: 7, nullable: true })
  lat!: number;

  @Column({ type: 'decimal', precision: 10, scale: 7, nullable: true })
  lng!: number;

  @Column({ nullable: true })
  phone!: string;
}
