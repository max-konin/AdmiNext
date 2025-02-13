'use server';

import 'dotenv/config';
import * as schema from '../../../../src/db/schema';
import { eq } from 'drizzle-orm';
import { drizzleDb } from '../../../../src';
import { User } from '../../../../src/db/types';

export const findAllUsers = async () => wrapData(drizzleDb.query.usersTable.findMany());

export const deleteUser = async (id: string) => {
  await drizzleDb.delete(schema.usersTable).where(eq(schema.usersTable.id, Number(id)))
}

export const createUser = async (data: User) => {
  await drizzleDb.insert(schema.usersTable).values(data);
}

export const findUserByIdForEdit = async (id: string) => wrapData(drizzleDb.query.usersTable.findFirst({
  where: eq(schema.usersTable.id, Number(id)),
}))

export const updateUser = async (data: User, id: string) => {
  await drizzleDb.update(schema.usersTable).set(data).where(eq(schema.usersTable.id, Number(id)));
}

const wrapData = <T>(dataPromise: Promise<T>) =>
  dataPromise.then((data) => ({ data }));
