import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { usersTable } from './db/schema';

export const drizzleDb = drizzle(process.env.DATABASE_URL!);

async function main() {
  const user: typeof usersTable.$inferInsert = {
    name: 'John',
  };
  await drizzleDb.insert(usersTable).values(user);
  console.log('New user created!')
  const users = await drizzleDb.select().from(usersTable);
  console.log('Getting all users from the database: ', users);
}
main();
