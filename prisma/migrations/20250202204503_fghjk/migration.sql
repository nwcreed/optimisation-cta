-- AlterTable
ALTER TABLE "button_scans" ADD COLUMN     "isTracked" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "button_clicks" (
    "id" TEXT NOT NULL,
    "buttonId" TEXT NOT NULL,
    "websiteId" INTEGER NOT NULL,
    "clickedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT,

    CONSTRAINT "button_clicks_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "button_clicks" ADD CONSTRAINT "button_clicks_websiteId_fkey" FOREIGN KEY ("websiteId") REFERENCES "websites"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "button_clicks" ADD CONSTRAINT "button_clicks_buttonId_fkey" FOREIGN KEY ("buttonId") REFERENCES "button_scans"("id") ON DELETE CASCADE ON UPDATE CASCADE;
