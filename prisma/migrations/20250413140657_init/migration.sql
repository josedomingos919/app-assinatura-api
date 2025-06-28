/*
  Warnings:

  - You are about to drop the column `email` on the `user` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_user" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL
);
INSERT INTO "new_user" ("createdAt", "id", "name", "password", "updatedAt", "username") SELECT "createdAt", "id", "name", "password", "updatedAt", "username" FROM "user";
DROP TABLE "user";
ALTER TABLE "new_user" RENAME TO "user";
CREATE UNIQUE INDEX "user_name_key" ON "user"("name");
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");
CREATE UNIQUE INDEX "user_password_key" ON "user"("password");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
