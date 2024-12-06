'use server';

import { Prisma } from '@prisma/client';
import { prisma } from '../../../db';

export const findAllCategories = () => wrapData(prisma.category.findMany());
export const findCategoryByIdForEdit = (id: string) =>
  wrapData(prisma.category.findUnique({ where: { id: Number(id) } }));

export const createCategory = (data: Prisma.CategoryCreateInput) =>
  prisma.category.create({ data });

export const updateCategory = (data: Prisma.CategoryCreateInput, id: string) =>
  prisma.category.update({ where: { id: Number(id) }, data });

export const deleteCategory = (id: string) =>
  prisma.category.delete({ where: { id: Number(id) } })

const wrapData = <T>(dataPromise: Promise<T>) =>
  dataPromise.then((data) => ({ data }));