/*
  Warnings:

  - Added the required column `userId` to the `Signature` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Signature" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "img" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "bi" TEXT NOT NULL,
    "signature" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Signature_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Signature" ("bi", "createdAt", "id", "img", "name", "signature", "updatedAt") SELECT "bi", "createdAt", "id", "img", "name", "signature", "updatedAt" FROM "Signature";
DROP TABLE "Signature";
ALTER TABLE "new_Signature" RENAME TO "Signature";
CREATE UNIQUE INDEX "Signature_bi_key" ON "Signature"("bi");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
