import z from 'zod';
import { resource } from './utils';

export const posts = [
  { id: 1, title: 'Hello, World!' },
  { id: 2, title: 'Hello, Universe!' },
  { id: 3, title: 'Hello, Galaxy!' },
  { id: 4, title: 'Hello, Multiverse!' },
  { id: 5, title: 'Hello, Omniverse!' },
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
        fields: {
          id: { label: 'ID' },
          name: { label: 'Name' },
        },
        actions: {
          submit: async (data) => {
            console.log('Submit Data', data);
          },
        },
      },
      list: {
        loader: async () => ({ data: users }),
        fields: {
          id: { label: 'ID' },
          name: { label: 'Name' },
        },
      },
      edit: {
        schema: z.object({
          name: z.string(),
        }),
        loader: async (id) => ({
          data: users.find((user) => user.id === Number(id)),
          related: { tags: [1, 2, 3] },
        }),
        fields: {
          id: { label: 'ID' },
          name: { label: 'Name' },
        },
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
        fields: {
          id: { label: 'ID' },
          title: { label: 'Title' },
        },
      },
      edit: {
        schema: z.object({
          title: z.string(),
        }),
        fields: {
          id: { label: 'ID' },
          title: { label: 'Title' },
        },
        loader: async (id) => {
          return {
            data: posts.find((post) => post.id === Number(id)),
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
