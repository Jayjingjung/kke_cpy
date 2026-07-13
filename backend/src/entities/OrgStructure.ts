import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';

@Entity('org_structure')
export class OrgStructure {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'text' })
  name_lo!: string;

  @Column({ type: 'text' })
  name_en!: string;

  @Column({ type: 'text' })
  name_zh!: string;

  @Column({ nullable: true })
  parent_id!: number | null;

  @ManyToOne(() => OrgStructure, (org) => org.children, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'parent_id' })
  parent!: OrgStructure | null;

  @OneToMany(() => OrgStructure, (org) => org.parent)
  children!: OrgStructure[];

  @Column({ type: 'int', default: 0 })
  level!: number;

  @Column({ type: 'int', default: 0 })
  order!: number;
}
