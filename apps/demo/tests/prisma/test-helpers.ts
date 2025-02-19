import { prisma } from '../../db';

export const resetDB = async () => {
  await prisma.post.deleteMany();
  await prisma.category.deleteMany();
};
