/*
  Warnings:

  - You are about to drop the column `clickCount` on the `button_scans` table. All the data in the column will be lost.
  - You are about to drop the `clicks` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "clicks" DROP CONSTRAINT "clicks_buttonId_fkey";

-- AlterTable
ALTER TABLE "button_scans" DROP COLUMN "clickCount";

-- DropTable
DROP TABLE "clicks";
