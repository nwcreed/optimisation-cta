-- CreateTable
CREATE TABLE "_ClickToVariant" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ClickToVariant_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_ClickToVariant_B_index" ON "_ClickToVariant"("B");

-- AddForeignKey
ALTER TABLE "_ClickToVariant" ADD CONSTRAINT "_ClickToVariant_A_fkey" FOREIGN KEY ("A") REFERENCES "clicks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClickToVariant" ADD CONSTRAINT "_ClickToVariant_B_fkey" FOREIGN KEY ("B") REFERENCES "variants"("id") ON DELETE CASCADE ON UPDATE CASCADE;
