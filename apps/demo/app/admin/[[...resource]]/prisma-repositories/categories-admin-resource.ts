import { resource } from "@adminext/core";
import { Prisma } from "@prisma/client";
import { z } from "zod";
import { findAllCategories, deleteCategory, createCategory, findCategoryByIdForEdit, updateCategory } from "./category.repository";

export const categoriesAdminResources = resource({
  title: 'Categories',
  identityBy: 'id',
  group: 'Prisma',
  pages: {
    list: {
      loader: findAllCategories,
      columns: [
        { accessorKey: 'id', header: 'ID', enableColumnFilter: false },
        { accessorKey: 'name', header: 'Name', filterFn: 'includesString' },
        {
          accessorKey: 'createdAt',
          enableColumnFilter: false,
          header: 'Created At',
          cell: ({ row }) => row.original.createdAt.toLocaleString(),
        },
      ],
      actions: {
        delete: async (id: string) => {
          await deleteCategory(id);
        },
      },
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
        submit: async ({
          id,
          data,
        }: {
          id: string;
          data: Prisma.CategoryCreateInput;
        }) => {
          await updateCategory(data, id);
        },
      },
    },
  },
})
