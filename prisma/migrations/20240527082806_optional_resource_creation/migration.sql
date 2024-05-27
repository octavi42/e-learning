/*
  Warnings:

  - Added the required column `answerId` to the `Resources` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Resources` ADD COLUMN `answerId` VARCHAR(191) NOT NULL,
    MODIFY `summary` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Resources` ADD CONSTRAINT `Resources_answerId_fkey` FOREIGN KEY (`answerId`) REFERENCES `Answer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
