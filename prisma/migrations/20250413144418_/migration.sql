/*
  Warnings:

  - Added the required column `info` to the `shared` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_shared" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userIdSent" INTEGER NOT NULL,
    "userReceiveId" INTEGER NOT NULL,
    "info" TEXT NOT NULL,
    CONSTRAINT "shared_userIdSent_fkey" FOREIGN KEY ("userIdSent") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "shared_userReceiveId_fkey" FOREIGN KEY ("userReceiveId") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_shared" ("createdAt", "id", "updatedAt", "userIdSent", "userReceiveId") SELECT "createdAt", "id", "updatedAt", "userIdSent", "userReceiveId" FROM "shared";
DROP TABLE "shared";
ALTER TABLE "new_shared" RENAME TO "shared";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
