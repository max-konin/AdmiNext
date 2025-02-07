'use server';

import 'dotenv/config';
import * as schema from './schema';
import { eq } from 'drizzle-orm';
import { drizzleDb } from '.';

export const findAllUsers = async () => wrapData(drizzleDb.query.usersTable.findMany());

export const deleteUser = async (id: string) => {
  try {
    await drizzleDb.delete(schema.usersTable).where(eq(schema.usersTable.id, Number(id)))
  } catch (e) {
    console.log(e)
  }
}

const wrapData = <T>(dataPromise: Promise<T>) =>
  dataPromise.then((data) => ({ data }));
