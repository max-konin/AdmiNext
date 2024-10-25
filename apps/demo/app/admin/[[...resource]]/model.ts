import { resource } from '@adminext/core';
import { z } from 'zod';
import {
  createCategory,
  findAllCategories,
  findCategoryByIdForEdit,
} from './prisma-repositories/category.repository';

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
      },
      new: {
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
          submit: async ({ id, data }) => {
            console.log('Submit Data', id, data);
          },
        },
      },
    },
  }),
};
