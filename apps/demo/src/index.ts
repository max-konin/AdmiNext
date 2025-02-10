import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { usersTable } from './db/schema';
import { eq } from 'drizzle-orm';

export const drizzleDb = drizzle(process.env.DATABASE_URL!, { schema: { usersTable } });

async function main() {
  const user: typeof usersTable.$inferInsert = {
    name: 'John',
    age: 30,
    email: 'john@example.com',
  };
  await drizzleDb.insert(usersTable).values(user);
  console.log('New user created!')
  const users = await drizzleDb.select().from(usersTable);
  console.log('Getting all users from the database: ', users)
  await drizzleDb
    .update(usersTable)
    .set({
      age: 31,
    })
    .where(eq(usersTable.email, user.email));
  console.log('User info updated!')
}
main(); 