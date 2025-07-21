/*
  Warnings:

  - Added the required column `code` to the `Solve` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Solve" ADD COLUMN     "code" TEXT NOT NULL;
