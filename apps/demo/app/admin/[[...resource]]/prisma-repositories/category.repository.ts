'use server';

import { Prisma } from '@prisma/client';
import { prisma } from '../../../db';

export const findAllCategories = () => wrapData(prisma.category.findMany());
export const findCategoryByIdForEdit = (id: number) =>
  wrapData(prisma.category.findUnique({ where: { id } }));

export const createCategory = (data: Prisma.CategoryCreateInput) =>
  prisma.category.create({ data });

const wrapData = <T>(dataPromise: Promise<T>) =>
  dataPromise.then((data) => ({ data }));
