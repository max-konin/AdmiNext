import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';

export const drizzleDb = drizzle(process.env.DATABASE_URL!);
