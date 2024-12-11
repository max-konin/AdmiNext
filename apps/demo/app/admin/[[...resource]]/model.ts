import { belongsTo, file, resource } from '@adminext/core';
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
        fields: {
          id: { label: 'ID' },
          name: { label: 'Name' },
          createdAt: {
            label: 'Created At',
            render: (value) => value.toLocaleString(),
          },
        },
        actions: {
          delete: async (id: string) => {
            await deleteCategory(id);
          }
        }
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
          submit: async ({ id, data }: {
            id: string, data: Prisma.CategoryCreateInput;
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
        fields: {
          id: { label: 'ID' },
          title: { label: 'Title' },
          published: {
            label: 'Published',
            render: (value) => (value ? '✅' : '❌'),
          },
          category: { label: 'Category', render: (value) => value.name },
          createdAt: {
            label: 'Created At',
            render: (value) => value.toLocaleString(),
          },
        },
        actions: {
          delete: async (id: string) => {
            await deletePost(id);
          }
        }
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
            file: z
              .any()
              .refine((file) => file?.size <= 5000, `Max image size is 5MB.`)
              .superRefine(file())
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
