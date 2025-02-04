/*
  Warnings:

  - You are about to drop the column `userId` on the `Website` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Website" DROP CONSTRAINT "Website_userId_fkey";

-- AlterTable
ALTER TABLE "Website" DROP COLUMN "userId";
