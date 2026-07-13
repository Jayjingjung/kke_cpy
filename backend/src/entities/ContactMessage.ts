import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('contact_messages')
export class ContactMessage {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  email!: string;

  @Column({ nullable: true })
  phone!: string;

  @Column({ type: 'text' })
  message!: string;

  @Column({ default: 'unread' })
  status!: string;

  @CreateDateColumn()
  created_at!: Date;
}
