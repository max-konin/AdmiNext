import { resource } from '@adminext/core';
import { deleteUser, findAllUsers } from './user.repository';

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
        ],
        actions: {
          delete: async (id: string) => {
            await deleteUser(id);
          },
        },
      },
    },
  }),
}
