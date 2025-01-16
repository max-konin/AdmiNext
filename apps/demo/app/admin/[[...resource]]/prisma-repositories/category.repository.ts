'use server';

import { Prisma } from '@prisma/client';
import { prisma } from '../../../db';

export const findAllCategories = async () =>
  wrapData(prisma.category.findMany());

export const findCategoryByIdForEdit = async (id: string) =>
  wrapData(prisma.category.findUnique({ where: { id: Number(id) } }));

export const createCategory = async (data: Prisma.CategoryCreateInput) =>
  prisma.category.create({ data });

export const updateCategory = async (
  data: Prisma.CategoryCreateInput,
  id: string
) => prisma.category.update({ where: { id: Number(id) }, data });

export const deleteCategory = async (id: string) =>
  prisma.category.delete({ where: { id: Number(id) } });

const wrapData = <T>(dataPromise: Promise<T>) =>
  dataPromise.then((data) => ({ data }));
