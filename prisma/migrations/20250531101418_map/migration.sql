/*
  Warnings:

  - You are about to drop the `received-gift` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "received-gift";

-- CreateTable
CREATE TABLE "received-gifts" (
    "id" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "givenBy" TEXT NOT NULL,
    "comment" TEXT,

    CONSTRAINT "received-gifts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "received-gifts_number_key" ON "received-gifts"("number");
