-- CreateTable
CREATE TABLE "variants" (
    "id" TEXT NOT NULL,
    "buttonScanId" TEXT NOT NULL,
    "text" TEXT,
    "className" TEXT,
    "buttonId" TEXT,
    "bgColor" TEXT,
    "textColor" TEXT,
    "width" INTEGER,
    "height" INTEGER,
    "positionX" DOUBLE PRECISION,
    "positionY" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "variants_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "variants" ADD CONSTRAINT "variants_buttonScanId_fkey" FOREIGN KEY ("buttonScanId") REFERENCES "button_scans"("id") ON DELETE CASCADE ON UPDATE CASCADE;
