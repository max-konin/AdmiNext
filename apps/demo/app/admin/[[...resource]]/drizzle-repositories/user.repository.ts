'use server';

import 'dotenv/config';
import * as schema from './schema';
import { eq } from 'drizzle-orm';
import { drizzleDb } from './index';
import { usersTable } from './schema';

export const findAllUsers = async () => wrapData(drizzleDb.query.usersTable.findMany());

export const deleteUser = async (id: string) => {
  try {
    await drizzleDb.delete(schema.usersTable).where(eq(schema.usersTable.id, Number(id)))
  } catch (e) {
    console.log(e)
  }
}

export const createUser = async (data: any) => {
  try {
    await drizzleDb.insert(usersTable).values(data);
  } catch (e) {
    console.log(e);
  }
}

export const findUserByIdForEdit = async (id: string) => {
  try {
    const user = await drizzleDb.query.usersTable.findFirst({
      where: eq(usersTable.id, Number(id)),
    })
    return user ? { data: user } : { data: null }
  } catch (e) {
    console.log(e);
    return { data: null };
  }
}

export const updateUser = async (data: any, id: string) => {
  try {
    await drizzleDb.update(usersTable).set(data).where(eq(usersTable.id, Number(id)));
  } catch (e) {
    console.log(e);
  }
}

const wrapData = <T>(dataPromise: Promise<T>) =>
  dataPromise.then((data) => ({ data }));
