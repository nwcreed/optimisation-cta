/*
  Warnings:

  - You are about to drop the column `isTracked` on the `button_scans` table. All the data in the column will be lost.
  - You are about to drop the `button_clicks` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "button_clicks" DROP CONSTRAINT "button_clicks_buttonId_fkey";

-- DropForeignKey
ALTER TABLE "button_clicks" DROP CONSTRAINT "button_clicks_websiteId_fkey";

-- AlterTable
ALTER TABLE "button_scans" DROP COLUMN "isTracked";

-- DropTable
DROP TABLE "button_clicks";
