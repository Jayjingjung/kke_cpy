import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';
import { IsEmail, MinLength } from 'class-validator';

export type UserRole = 'super_admin' | 'editor';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  @MinLength(3)
  username!: string;

  @Column({ unique: true })
  @IsEmail()
  email!: string;

  @Column()
  password_hash!: string;

  @Column({ type: 'enum', enum: ['super_admin', 'editor'], default: 'editor' })
  role!: UserRole;

  @CreateDateColumn()
  created_at!: Date;
}
