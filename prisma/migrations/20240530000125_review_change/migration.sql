/*
  Warnings:

  - You are about to drop the column `imrovement_description` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `review_description` on the `Category` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Category` DROP COLUMN `imrovement_description`,
    DROP COLUMN `review_description`,
    ADD COLUMN `improvement` TEXT NULL,
    ADD COLUMN `review` TEXT NULL,
    ADD COLUMN `score` INTEGER NULL;
