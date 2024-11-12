'use server';

import { Prisma } from '@prisma/client';
import { prisma } from '../../../db';

export const findAllPosts = () =>
  wrapData(prisma.post.findMany({ include: { category: true } }));
export const findPostById = (id: string) =>
  prisma.post.findUniqueOrThrow({ where: { id: Number(id) } });

export const findRelatedData = async () => {
  const categories = await prisma.category.findMany();
  return { related: { categories } };
};

export const findPostByIdForEdit = async (id: string) => {
  const [post, { related }] = await Promise.all([
    findPostById(id),
    findRelatedData(),
  ]);
  return {
    data: post,
    related,
  };
};

export const createPost = (data: Prisma.PostCreateInput) =>
  prisma.post.create({ data });

const wrapData = <T>(dataPromise: Promise<T>) =>
  dataPromise.then((data) => ({ data }));
