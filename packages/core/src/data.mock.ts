import { removeServerFunctionsFromResourceDefinition, resource } from './utils';

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
      list: {
        loader: async () => users,
        fields: {
          id: { label: 'ID' },
          name: { label: 'Name' },
        },
      },
      show: {
        loader: async (id) => users.find((user) => user.id === Number(id)),
        fields: {
          id: { label: 'ID' },
          name: { label: 'Name' },
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
          return posts;
        },
        fields: {
          id: { label: 'ID' },
          title: { label: 'Title' },
        },
      },
      show: {
        fields: {
          id: { label: 'ID' },
          title: { label: 'Title' },
        },
        loader: async (id) => {
          return posts.find((post) => post.id === Number(id));
        },
      },
    },
  }),
};

// TODO: improve typing
export const clientResources = Object.fromEntries(
  Object.entries(resources).map(([k, r]) => [
    k,
    removeServerFunctionsFromResourceDefinition(r as any),
  ])
);
