import { prisma } from '../../app/db-prisma';

export const resetDB = async () => {
  await prisma.post.deleteMany();
  await prisma.category.deleteMany();
};
