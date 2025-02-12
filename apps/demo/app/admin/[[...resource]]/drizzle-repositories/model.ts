import { resource } from '@adminext/core';
import { createUser, deleteUser, findAllUsers, findUserByIdForEdit, updateUser } from './user.repository';
import { z } from 'zod';

export const adminResources = {
  users: resource({
    title: 'Users',
    identityBy: 'id',
    group: 'Drizzle',
    pages: {
      list: {
        loader: findAllUsers,
        columns: [
          { accessorKey: 'id', header: 'ID', enableColumnFilter: false },
          { accessorKey: 'name', header: 'Name', filterFn: 'includesString' },
          { accessorKey: 'age', header: 'Age', filterFn: 'includesString' },
          { accessorKey: 'email', header: 'Email', filterFn: 'includesString' },
        ],
        actions: {
          delete: async (id: string) => {
            await deleteUser(id);
          },
        },
      },
      new: {
        loader: undefined,
        schema: z.object({
          name: z.string().min(1).default(''),
          age: z.number({
            coerce: true
          }).min(10).max(100),
          email: z.string().email(),
        }),
        actions: {
          submit: async ({ data }) => {
            await createUser(data);
          },
        },
      },
      edit: {
        schema: z.object({
          name: z.string(),
          age: z.number({
            coerce: true
          }).min(10).max(100),
          email: z.string().email(),
        }),
        loader: findUserByIdForEdit,
        actions: {
          submit: async ({
            id,
            data,
          }: {
            id: string;
            data: any;
          }) => {
            await updateUser(data, id);
          },
        },
      },
    },
  }),
}

