-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "metaDescription" TEXT,
ADD COLUMN     "tags" TEXT[] DEFAULT ARRAY[]::TEXT[];
