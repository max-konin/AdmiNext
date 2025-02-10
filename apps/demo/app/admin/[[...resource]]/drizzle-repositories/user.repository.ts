'use server';

import 'dotenv/config';
import * as schema from '../../../../src/db/schema';
import { eq } from 'drizzle-orm';
import { drizzleDb } from '../../../../src/index';
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
    await drizzleDb.insert(usersTable).values(data)
  } catch (e) {
    console.log(e)
  }
}
const wrapData = <T>(dataPromise: Promise<T>) =>
  dataPromise.then((data) => ({ data }));
