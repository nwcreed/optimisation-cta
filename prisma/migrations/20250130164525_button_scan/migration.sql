/*
  Warnings:

  - You are about to drop the `Website` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Website" DROP CONSTRAINT "Website_userId_fkey";

-- DropTable
DROP TABLE "Website";

-- CreateTable
CREATE TABLE "websites" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "domain" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "websites_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "button_scans" (
    "id" TEXT NOT NULL,
    "websiteId" INTEGER NOT NULL,
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

    CONSTRAINT "button_scans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "button_clicks" (
    "id" TEXT NOT NULL,
    "scanId" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT,

    CONSTRAINT "button_clicks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "websites_domain_key" ON "websites"("domain");

-- AddForeignKey
ALTER TABLE "websites" ADD CONSTRAINT "websites_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "button_scans" ADD CONSTRAINT "button_scans_websiteId_fkey" FOREIGN KEY ("websiteId") REFERENCES "websites"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "button_clicks" ADD CONSTRAINT "button_clicks_scanId_fkey" FOREIGN KEY ("scanId") REFERENCES "button_scans"("id") ON DELETE CASCADE ON UPDATE CASCADE;
