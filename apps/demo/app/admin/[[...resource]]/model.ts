import { resource } from '@adminext/core';
import { z } from 'zod';

export const posts = [
  { id: 1, title: 'Hello, World!', text: 'Hello, World!' },
  { id: 2, title: 'Hello, Universe!', text: 'Hello, World!' },
  { id: 3, title: 'Hello, Galaxy!', text: 'Hello, World!' },
  { id: 4, title: 'Hello, Multiverse!', text: 'Hello, World!' },
  { id: 5, title: 'Hello, Omniverse!', text: 'Hello, World!' },
];

export const users = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Doe' },
  { id: 3, name: 'John Smith' },
];

export const adminResources = {
  users: resource({
    title: 'Users',
    identityBy: 'id',
    pages: {
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
          submit: async ({ id, data }) => {
            console.log('Submit Data', id, data);
          },
        },
      },
    },
  }),
  posts: resource({
    group: 'Content',
    title: 'Posts',
    identityBy: 'id',
    toString: (data) => data.title,
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
          title: z.string().min(1),
          text: z.string().min(1),
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
          submit: async ({ id, data }) => {
            console.log('Submit Data', id, data);
          },
        },
      },
    },
  }),
};
