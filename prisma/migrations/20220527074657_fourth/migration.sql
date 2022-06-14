/*
  Warnings:

  - You are about to drop the column `roll` on the `Blog` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Blog" DROP COLUMN "roll",
ADD COLUMN     "role" "Role" NOT NULL DEFAULT E'ADMIN';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "first_time" BOOLEAN NOT NULL DEFAULT true;
