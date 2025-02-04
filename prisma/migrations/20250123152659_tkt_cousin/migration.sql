/*
  Warnings:

  - You are about to drop the `ButtonVariant` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "ButtonVariant";

-- CreateTable
CREATE TABLE "Website" (
    "id" SERIAL NOT NULL,
    "website" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Website_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Website_website_key" ON "Website"("website");
