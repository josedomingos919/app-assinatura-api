/*
  Warnings:

  - A unique constraint covering the columns `[bi,userId]` on the table `Signature` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Signature_bi_key";

-- CreateIndex
CREATE UNIQUE INDEX "Signature_bi_userId_key" ON "Signature"("bi", "userId");
