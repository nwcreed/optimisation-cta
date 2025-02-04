-- CreateTable
CREATE TABLE "ButtonClick" (
    "id" TEXT NOT NULL,
    "buttonScanId" TEXT NOT NULL,
    "clickedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ButtonClick_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ButtonClick" ADD CONSTRAINT "ButtonClick_buttonScanId_fkey" FOREIGN KEY ("buttonScanId") REFERENCES "button_scans"("id") ON DELETE CASCADE ON UPDATE CASCADE;
