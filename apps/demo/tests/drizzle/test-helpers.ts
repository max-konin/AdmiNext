import { drizzleClient, usersTable } from '../../db';

export const resetDB = async () => {
  await drizzleClient.delete(usersTable);
};
