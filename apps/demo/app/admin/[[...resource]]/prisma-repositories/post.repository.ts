'use server';

import { Prisma } from '@prisma/client';
import { prisma } from '../../../db';

export const findAllPosts = async () =>
  wrapData(prisma.post.findMany({ include: { category: true } }));

export const findPostById = async (id: string) =>
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

export const createPost = async (data: Prisma.PostCreateInput) =>
  prisma.post.create({ data: { ...data } });

export const deletePost = async (id: string) =>
  prisma.post.delete({ where: { id: Number(id) } });

const wrapData = <T>(dataPromise: Promise<T>) =>
  dataPromise.then((data) => ({ data }));
