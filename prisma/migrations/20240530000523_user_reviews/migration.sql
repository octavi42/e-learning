/*
  Warnings:

  - You are about to drop the column `improvement` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `review` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `score` on the `Category` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Category` DROP COLUMN `improvement`,
    DROP COLUMN `review`,
    DROP COLUMN `score`;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `improvement` TEXT NULL,
    ADD COLUMN `review` TEXT NULL,
    ADD COLUMN `score` INTEGER NULL;
