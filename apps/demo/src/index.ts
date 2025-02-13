import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { postsTable, usersTable } from './db/schema';

export const drizzleDb = drizzle(process.env.DATABASE_URL!, { schema: { usersTable, postsTable } });
