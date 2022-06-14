/*
  Warnings:

  - You are about to drop the column `pass_changed` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "pass_changed",
ADD COLUMN     "verify" BOOLEAN NOT NULL DEFAULT false;
