/*
  Warnings:

  - You are about to drop the `_ClickToVariant` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ClickToVariant" DROP CONSTRAINT "_ClickToVariant_A_fkey";

-- DropForeignKey
ALTER TABLE "_ClickToVariant" DROP CONSTRAINT "_ClickToVariant_B_fkey";

-- AlterTable
ALTER TABLE "clicks" ADD COLUMN     "variantId" TEXT;

-- DropTable
DROP TABLE "_ClickToVariant";

-- AddForeignKey
ALTER TABLE "clicks" ADD CONSTRAINT "clicks_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "variants"("id") ON DELETE SET NULL ON UPDATE CASCADE;
