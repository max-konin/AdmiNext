'use server';

import 'dotenv/config';
import * as schema from './schema';
import { eq } from 'drizzle-orm';
import { drizzleDb } from './index';
import { usersTable } from './schema';

export const findAllUsers = async () => wrapData(drizzleDb.query.usersTable.findMany());

export const deleteUser = async (id: string) => {
  await drizzleDb.delete(schema.usersTable).where(eq(schema.usersTable.id, Number(id)))
}

export const createUser = async (data: any) => {
  await drizzleDb.insert(usersTable).values(data);
}

export const findUserByIdForEdit = async (id: string) => wrapData(drizzleDb.query.usersTable.findFirst({
  where: eq(usersTable.id, Number(id)),
}))

export const updateUser = async (data: any, id: string) => {
  await drizzleDb.update(usersTable).set(data).where(eq(usersTable.id, Number(id)));
}

const wrapData = <T>(dataPromise: Promise<T>) =>
  dataPromise.then((data) => ({ data }));
