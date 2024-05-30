/*
  Warnings:

  - You are about to drop the column `evaluateion` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `User` DROP COLUMN `evaluateion`,
    ADD COLUMN `evaluation` BOOLEAN NOT NULL DEFAULT false;
