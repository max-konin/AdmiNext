'use server';

import { eq } from 'drizzle-orm';
import { wrapData } from '../../utils';
import { drizzleClient, usersTable } from '../../../../../../db/drizzle';

export const findAllUsers = async () =>
  wrapData(drizzleClient.query.usersTable.findMany());

export const deleteUser = async (id: string) => {
  await drizzleClient.delete(usersTable).where(eq(usersTable.id, Number(id)));
};

export const createUser = async (data: typeof usersTable.$inferInsert) => {
  await drizzleClient.insert(usersTable).values(data);
};

export const findUserByIdForEdit = async (id: string) =>
  wrapData(
    drizzleClient.query.usersTable.findFirst({
      where: eq(usersTable.id, Number(id)),
    })
  );

export const updateUser = async (
  data: typeof usersTable.$inferInsert,
  id: string
) => {
  await drizzleClient
    .update(usersTable)
    .set(data)
    .where(eq(usersTable.id, Number(id)));
};
