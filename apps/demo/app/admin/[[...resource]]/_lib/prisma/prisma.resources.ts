import { belongsTo, FileData, resource, files } from '@adminext/core';
import { z } from 'zod';

import { Prisma } from '@prisma/client';
import {
  findAllCategories,
  deleteCategory,
  createCategory,
  findCategoryByIdForEdit,
  updateCategory,
} from './repos/category.repository';
import {
  findAllPosts,
  deletePost,
  findRelatedData,
  createPost,
} from './repos/post.repository';
import { uploadFile } from './upload-file';

export const prismaResources = {
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
            meta: z
              .object({
                description: z.string().nullish(),
              })
              .default({ description: '' }),
            categoryId: z
              .string()
              .min(1)
              .superRefine(belongsTo(related.categories, 'name', 'id')),
            published: z.coerce.boolean().default(false),
            files: z
              .array(z.custom<FileData>())
              .optional()
              .default([])
              .superRefine(
                files({
                  maxFiles: 10,
                  label: 'Drag and drop here to upload',
                  description: '.png, .jpg up to 5MB',
                  accept: ['image/png', 'image/jpeg'],
                })
              ),
          }),
        actions: {
          submit: async ({
            data: {
              categoryId,
              files,
              meta: { description },
              ...rest
            },
          }) => {
            if (files && files.length > 0) {
              const uploadPromises = files.map(async (fileData) => {
                const blob = await fetch(fileData.url).then((r) => r.blob());
                await uploadFile(blob, fileData.name);
              });
              await Promise.all(uploadPromises);
            }
            await createPost({
              ...rest,
              metaDescription: description,
              category: { connect: { id: Number(categoryId) } },
            });
          },
        },
      },
    },
  }),
};
