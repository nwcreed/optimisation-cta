-- DropIndex
DROP INDEX "button_scans_buttonId_key";

-- CreateTable
CREATE TABLE "clicks" (
    "id" TEXT NOT NULL,
    "buttonId" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "clicks_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "clicks" ADD CONSTRAINT "clicks_buttonId_fkey" FOREIGN KEY ("buttonId") REFERENCES "button_scans"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
