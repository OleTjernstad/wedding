/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `Gift` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Gift" DROP COLUMN "imageUrl",
ADD COLUMN     "link" TEXT NOT NULL DEFAULT '';
