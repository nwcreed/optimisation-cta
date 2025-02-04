/*
  Warnings:

  - You are about to drop the `ButtonClick` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ButtonClick" DROP CONSTRAINT "ButtonClick_buttonScanId_fkey";

-- DropTable
DROP TABLE "ButtonClick";
