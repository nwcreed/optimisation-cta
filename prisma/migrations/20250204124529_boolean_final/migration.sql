/*
  Warnings:

  - You are about to drop the column `status` on the `button_scans` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "button_scans" DROP COLUMN "status",
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;
