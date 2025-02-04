-- CreateTable
CREATE TABLE "ButtonVariant" (
    "id" TEXT NOT NULL,
    "buttonId" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "clicks" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ButtonVariant_pkey" PRIMARY KEY ("id")
);
