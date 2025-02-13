import { resource, belongsTo, FileData, files } from "@adminext/core";
import { z } from "zod";
import { uploadFile } from "../prisma-repositories/upload-file";
import { findAllPosts, deletePost, findRelatedData, createPost } from "./post.repository";

export const postsAdminResources = resource({
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
})
