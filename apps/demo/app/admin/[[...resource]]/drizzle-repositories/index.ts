import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { usersTable } from './schema';

export const drizzleDb = drizzle(process.env.DATABASE_URL!, { schema: { usersTable } });
