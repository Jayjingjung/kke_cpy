import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import { User } from '../entities/User';
import { Executive } from '../entities/Executive';
import { OrgStructure } from '../entities/OrgStructure';
import { Service } from '../entities/Service';
import { ServiceBranch } from '../entities/ServiceBranch';
import { Project } from '../entities/Project';
import { Gallery } from '../entities/Gallery';
import { ContactMessage } from '../entities/ContactMessage';
import { Setting } from '../entities/Setting';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306'),
  username: process.env.DB_USERNAME || 'khounkham',
  password: process.env.DB_PASSWORD || 'khounkham_secret',
  database: process.env.DB_DATABASE || 'khounkham_db',
  synchronize: true,
  logging: process.env.NODE_ENV !== 'production',
  entities: [User, Executive, OrgStructure, Service, ServiceBranch, Project, Gallery, ContactMessage, Setting],
  charset: 'utf8mb4',
});
