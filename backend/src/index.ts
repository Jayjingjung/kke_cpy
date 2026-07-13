import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import path from 'path';
import dotenv from 'dotenv';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { AppDataSource } from './config/database';
import { typeDefs, resolvers, createContext } from './graphql/schema';
import { authMiddleware } from './middleware/auth';
import authRoutes from './rest/routes/auth';
import publicRoutes from './rest/routes/public';
import adminRoutes from './rest/routes/admin';

dotenv.config();

async function bootstrap() {
  await AppDataSource.initialize();
  console.log('Database connected');

  const app = express();

  app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
  app.use(cors({ origin: process.env.CORS_ORIGIN || '*', credentials: true }));
  app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 200 }));
  app.use(express.json());
  app.use(authMiddleware);

  app.use('/uploads', express.static(path.join(__dirname, '..', process.env.UPLOAD_DIR || 'uploads')));

  app.use('/api/v1/auth', authRoutes);
  app.use('/api/v1', publicRoutes);
  app.use('/api/v1/admin', adminRoutes);

  const apollo = new ApolloServer({ typeDefs, resolvers });
  await apollo.start();
  app.use('/graphql', expressMiddleware(apollo, { context: async () => createContext() }) as any);

  const port = parseInt(process.env.PORT || '4000');
  app.listen(port, () => console.log(`Server running on port ${port}`));
}

bootstrap().catch(console.error);
