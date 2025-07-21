-- AlterTable
ALTER TABLE "Problem" ADD COLUMN     "constraints" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "inputtype" TEXT NOT NULL DEFAULT '';
