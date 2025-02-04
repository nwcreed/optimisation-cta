-- AlterTable
ALTER TABLE "button_scans" ADD COLUMN     "clickCount" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "clicks" (
    "id" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "clickedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "buttonId" TEXT NOT NULL,

    CONSTRAINT "clicks_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "clicks" ADD CONSTRAINT "clicks_buttonId_fkey" FOREIGN KEY ("buttonId") REFERENCES "button_scans"("buttonId") ON DELETE RESTRICT ON UPDATE CASCADE;
