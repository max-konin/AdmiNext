import { belongsTo, resource } from '@adminext/core';
import { z } from 'zod';
import {
  createCategory,
  deleteCategory,
  findAllCategories,
  findCategoryByIdForEdit,
  updateCategory,
} from './prisma-repositories/category.repository';
import {
  createPost,
  deletePost,
  findAllPosts,
  findRelatedData,
} from './prisma-repositories/post.repository';
import { Prisma } from '@prisma/client';

export const adminResources = {
  categories: resource({
    title: 'Categories',
    identityBy: 'id',
    group: 'Prisma',
    pages: {
      list: {
        loader: findAllCategories,
        columns: [
          { accessorKey: 'id', header: 'ID', enableColumnFilter: false },
          { accessorKey: 'name', header: 'Name', filterFn: 'includesString' },
          {
            accessorKey: 'createdAt',
            enableColumnFilter: false,
            header: 'Created At',
            cell: ({ row }) => row.original.createdAt.toLocaleString(),
          },
        ],
        actions: {
          delete: async (id: string) => {
            await deleteCategory(id);
          },
        },
      },
      new: {
        loader: undefined,
        schema: z.object({
          name: z.string().min(1).default(''),
        }),
        actions: {
          submit: async ({ data }) => {
            await createCategory(data);
          },
        },
      },
      edit: {
        schema: z.object({
          name: z.string(),
        }),
        loader: findCategoryByIdForEdit,
        actions: {
          submit: async ({
            id,
            data,
          }: {
            id: string;
            data: Prisma.CategoryCreateInput;
          }) => {
            await updateCategory(data, id);
          },
        },
      },
    },
  }),
  posts: resource({
    title: 'Posts',
    group: 'Prisma',
    identityBy: 'id',
    pages: {
      list: {
        loader: findAllPosts,
        columns: [
          {
            accessorKey: 'id',
            header: 'ID',
            enableColumnFilter: false,
          },
          {
            accessorKey: 'title',
            header: 'Title',
            filterFn: 'includesString',
          },
          {
            accessorKey: 'published',
            header: 'Published',
            cell: ({ row }) => (row.original.published ? '✅' : '❌'),
            enableColumnFilter: false,
          },
          {
            accessorKey: 'category',
            header: 'Category',
            filterFn: 'includesString',
            accessorFn: (row) => row.category.name,
          },
          {
            header: 'Created At',
            accessorKey: 'createdAt',
            enableColumnFilter: false,
            cell: ({ row }) => row.original.createdAt.toLocaleString(),
          },
        ],
        actions: {
          delete: async (id: string) => {
            await deletePost(id);
          },
        },
      },
      new: {
        loader: findRelatedData,
        schema: ({ related }) =>
          z.object({
            title: z.string().min(1).default(''),
            content: z.string().min(1).default(''),
            categoryId: z
              .string()
              .min(1)
              .superRefine(belongsTo(related.categories, 'name', 'id')),
            published: z.coerce.boolean().default(false),
          }),
        actions: {
          submit: async ({ data: { categoryId, ...rest } }) => {
            await createPost({
              ...rest,
              category: { connect: { id: Number(categoryId) } },
            });
          },
        },
      },
    },
  }),
};
