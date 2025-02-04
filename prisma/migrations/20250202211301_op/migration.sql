/*
  Warnings:

  - A unique constraint covering the columns `[buttonId]` on the table `button_scans` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "button_scans_buttonId_key" ON "button_scans"("buttonId");
