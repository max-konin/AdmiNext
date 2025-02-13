import { belongsTo, FileData, files, resource } from '@adminext/core';
import { createUser, deleteUser, findAllUsers, findUserByIdForEdit, updateUser } from './user.repository';
import { z } from 'zod';
import { createPost, deletePost, findAllPosts, findRelatedData } from './post.repository';
import { uploadFile } from '../prisma-repositories/upload-file';

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
  posts: resource({
    title: 'Posts',
    group: 'Drizzle',
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
            accessorKey: 'userName',
            header: 'User',
            filterFn: 'includesString',
            accessorFn: (row) => row.name,
          },
          {
            header: 'Created At',
            accessorKey: 'createdAt',
            enableColumnFilter: false,
            cell: ({ row }) => row.original.createdAt?.toLocaleString(),
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
            user: z
              .string()
              .min(1)
              .superRefine(belongsTo(related.users, 'name', 'id')),
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
              user,
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
              metaDescription: description || '',
              userId: Number(user),
            });
          },
        },
      },
    },
  }),
}

