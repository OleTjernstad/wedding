-- CreateTable
CREATE TABLE "received-gift" (
    "id" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "givenBy" TEXT NOT NULL,
    "comment" TEXT,

    CONSTRAINT "received-gift_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "received-gift_number_key" ON "received-gift"("number");
