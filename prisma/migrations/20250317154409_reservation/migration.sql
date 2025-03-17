/*
  Warnings:

  - You are about to drop the column `date` on the `Reservation` table. All the data in the column will be lost.
  - You are about to drop the column `guestEmail` on the `Reservation` table. All the data in the column will be lost.
  - You are about to drop the column `guestName` on the `Reservation` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Reservation" DROP COLUMN "date",
DROP COLUMN "guestEmail",
DROP COLUMN "guestName",
ADD COLUMN     "message" TEXT;
