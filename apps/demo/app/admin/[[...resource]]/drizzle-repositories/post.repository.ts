'use server';

import 'dotenv/config';
import { drizzleDb } from '../../../../src';
import * as schema from '../../../../src/db/schema';
import { eq } from 'drizzle-orm';
import { Post } from '../../../../src/db/types';

export const findAllPosts = async () => {
  const result = await drizzleDb.select().from(schema.postsTable).
    leftJoin(schema.usersTable, eq(schema.postsTable.userId, schema.usersTable.id));
  const data = result.map((obj) => {
    return { ...obj.posts, ...obj.users! }
  });
  return { data };
}

export const deletePost = async (id: string) => {
  await drizzleDb.delete(schema.postsTable).where(eq(schema.postsTable.id, Number(id)))
}

export const findRelatedData = async () => {
  const users = await drizzleDb.query.usersTable.findMany();
  return { related: { users } };
};

export const createPost = async (data: Post) => {
  await drizzleDb.insert(schema.postsTable).values(data);
}
