-- DropForeignKey
ALTER TABLE "clicks" DROP CONSTRAINT "clicks_buttonId_fkey";

-- AlterTable
ALTER TABLE "clicks" ALTER COLUMN "buttonId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "clicks" ADD CONSTRAINT "clicks_buttonId_fkey" FOREIGN KEY ("buttonId") REFERENCES "button_scans"("buttonId") ON DELETE SET NULL ON UPDATE CASCADE;
