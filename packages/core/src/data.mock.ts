import z from 'zod';
import { resource } from './utils';

export const posts = [
  { id: 1, title: 'Hello, World!', tags: [] },
  { id: 2, title: 'Hello, Universe!', tags: [] },
  { id: 3, title: 'Hello, Galaxy!', tags: [] },
  { id: 4, title: 'Hello, Multiverse!', tags: [] },
  { id: 5, title: 'Hello, Omniverse!', tags: [] },
];

export const users = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Doe' },
  { id: 3, name: 'John Smith' },
];

export const resources = {
  users: resource({
    title: 'Users',
    identityBy: 'id',
    pages: {
      new: {
        loader: undefined,
        schema: () =>
          z.object({
            name: z.string(),
          }),
        actions: {
          submit: async (data) => {
            console.log('Submit Data', data);
          },
        },
      },
      list: {
        loader: async () => ({ data: users }),
        columns: [
          { accessorKey: 'id', header: 'ID', enableColumnFilter: false },
          { accessorKey: 'name', header: 'Name', filterFn: 'includesString' },
        ],
      },
      edit: {
        schema: z.object({
          name: z.string(),
        }),
        loader: async (id) => ({
          data: users.find((user) => user.id === Number(id)),
          related: { tags: [1, 2, 3] },
        }),
        actions: {
          submit: async (data) => {
            console.log('Submit Data', data);
          },
        },
      },
    },
  }),
  posts: resource({
    group: 'Content',
    title: 'Posts',
    identityBy: 'id',
    pages: {
      list: {
        loader: async () => {
          return { data: posts };
        },
        columns: [
          { accessorKey: 'id', header: 'ID', enableColumnFilter: false },
          { accessorKey: 'title', header: 'Title', filterFn: 'includesString' },
        ],
      },
      edit: {
        schema: z.object({
          title: z.string(),
          tags: z.array(z.string()),
          meta: z.object({
            title: z.string(),
            description: z.string(),
          }),
        }),
        loader: async (id) => {
          return {
            data: {
              ...posts.find((post) => post.id === Number(id))!,
              meta: {
                title: 'Hello, World!',
                description: 'This is a post.',
              },
            },
            related: {},
          };
        },
        actions: {
          submit: async (data) => {
            console.log('Submit Data', data);
          },
        },
      },
    },
  }),
};
