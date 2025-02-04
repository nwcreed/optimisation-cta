/*
  Warnings:

  - The `isActive` column on the `button_scans` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "ButtonStatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- AlterTable
ALTER TABLE "button_scans" DROP COLUMN "isActive",
ADD COLUMN     "isActive" "ButtonStatus" NOT NULL DEFAULT 'ACTIVE';
