/*
  Warnings:

  - Made the column `categoryName` on table `Question` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `Question` DROP FOREIGN KEY `Question_categoryName_fkey`;

-- AlterTable
ALTER TABLE `Category` MODIFY `order` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Question` MODIFY `order` INTEGER NOT NULL,
    MODIFY `categoryName` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Question` ADD CONSTRAINT `Question_categoryName_fkey` FOREIGN KEY (`categoryName`) REFERENCES `Category`(`name`) ON DELETE RESTRICT ON UPDATE CASCADE;
