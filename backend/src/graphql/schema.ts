import gql from 'graphql-tag';
import DataLoader from 'dataloader';
import { AppDataSource } from '../config/database';
import { Executive } from '../entities/Executive';
import { OrgStructure } from '../entities/OrgStructure';
import { Service } from '../entities/Service';
import { ServiceBranch } from '../entities/ServiceBranch';
import { Project } from '../entities/Project';
import { Gallery } from '../entities/Gallery';
import { Setting } from '../entities/Setting';
import { In } from 'typeorm';

export const typeDefs = gql`
  type Executive {
    id: Int!
    name_lo: String!
    name_en: String!
    name_zh: String!
    position_lo: String!
    position_en: String!
    position_zh: String!
    bio_lo: String
    bio_en: String
    bio_zh: String
    photo_url: String
    order: Int!
  }

  type OrgNode {
    id: Int!
    name_lo: String!
    name_en: String!
    name_zh: String!
    parent_id: Int
    level: Int!
    order: Int!
    children: [OrgNode!]!
  }

  type ServiceBranch {
    id: Int!
    name_lo: String!
    name_en: String!
    name_zh: String!
    address_lo: String
    address_en: String
    address_zh: String
    lat: Float
    lng: Float
    phone: String
  }

  type Service {
    id: Int!
    slug: String!
    title_lo: String!
    title_en: String!
    title_zh: String!
    description_lo: String
    description_en: String
    description_zh: String
    icon: String
    cover_image: String
    order: Int!
    branches: [ServiceBranch!]!
  }

  type GalleryItem {
    id: Int!
    title_lo: String
    title_en: String
    title_zh: String
    category: String
    image_url: String!
    project_id: Int
    created_at: String!
  }

  type Project {
    id: Int!
    slug: String!
    title_lo: String!
    title_en: String!
    title_zh: String!
    category: String
    status: String!
    description_lo: String
    description_en: String
    description_zh: String
    start_date: String
    end_date: String
    location: String
    cover_image: String
    gallery: [GalleryItem!]!
  }

  type Setting {
    key: String!
    value_lo: String
    value_en: String
    value_zh: String
  }

  type Query {
    executives: [Executive!]!
    orgStructure: [OrgNode!]!
    services: [Service!]!
    service(slug: String!): Service
    projects(category: String, status: String): [Project!]!
    project(slug: String!): Project
    gallery(category: String): [GalleryItem!]!
    settings: [Setting!]!
  }
`;

function createBranchLoader() {
  return new DataLoader<number, ServiceBranch[]>(async (serviceIds) => {
    const branches = await AppDataSource.getRepository(ServiceBranch).find({
      where: { service_id: In(serviceIds as number[]) },
    });
    return serviceIds.map((id) => branches.filter((b) => b.service_id === id));
  });
}

function createGalleryLoader() {
  return new DataLoader<number, Gallery[]>(async (projectIds) => {
    const items = await AppDataSource.getRepository(Gallery).find({
      where: { project_id: In(projectIds as number[]) },
    });
    return projectIds.map((id) => items.filter((g) => g.project_id === id));
  });
}

export function createContext() {
  return {
    branchLoader: createBranchLoader(),
    galleryLoader: createGalleryLoader(),
  };
}

export const resolvers = {
  Query: {
    executives: () => AppDataSource.getRepository(Executive).find({ order: { order: 'ASC' } }),
    orgStructure: () => AppDataSource.getRepository(OrgStructure).find({ order: { level: 'ASC', order: 'ASC' } }),
    services: () => AppDataSource.getRepository(Service).find({ order: { order: 'ASC' } }),
    service: (_: any, { slug }: { slug: string }) =>
      AppDataSource.getRepository(Service).findOne({ where: { slug } }),
    projects: (_: any, { category, status }: { category?: string; status?: string }) => {
      const where: any = {};
      if (category) where.category = category;
      if (status) where.status = status;
      return AppDataSource.getRepository(Project).find({ where, order: { id: 'DESC' } });
    },
    project: (_: any, { slug }: { slug: string }) =>
      AppDataSource.getRepository(Project).findOne({ where: { slug } }),
    gallery: (_: any, { category }: { category?: string }) => {
      const where: any = {};
      if (category) where.category = category;
      return AppDataSource.getRepository(Gallery).find({ where, order: { created_at: 'DESC' } });
    },
    settings: () => AppDataSource.getRepository(Setting).find(),
  },
  Service: {
    branches: (parent: Service, _: any, ctx: any) => ctx.branchLoader.load(parent.id),
  },
  Project: {
    gallery: (parent: Project, _: any, ctx: any) => ctx.galleryLoader.load(parent.id),
  },
  OrgNode: {
    children: async (parent: OrgStructure) =>
      AppDataSource.getRepository(OrgStructure).find({
        where: { parent_id: parent.id },
        order: { order: 'ASC' },
      }),
  },
};
