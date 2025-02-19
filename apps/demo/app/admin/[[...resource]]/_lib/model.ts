import { prismaResources } from './prisma/prisma.resources';
import { drizzleResources } from './drizzle/drizzle.resources';

export const adminResources = {
  ...prismaResources,
  ...drizzleResources,
};
