/*
  Warnings:

  - You are about to drop the column `answered` on the `Answer` table. All the data in the column will be lost.
  - Added the required column `correct` to the `Answer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `review` to the `Answer` table without a default value. This is not possible if the table is not empty.
  - Made the column `rating` on table `Answer` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Answer` DROP COLUMN `answered`,
    ADD COLUMN `correct` BOOLEAN NOT NULL,
    ADD COLUMN `review` VARCHAR(191) NOT NULL,
    MODIFY `rating` INTEGER NOT NULL;
