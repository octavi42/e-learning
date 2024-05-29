-- DropForeignKey
ALTER TABLE `Question` DROP FOREIGN KEY `Question_categoryName_fkey`;

-- AlterTable
ALTER TABLE `Question` MODIFY `categoryName` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Question` ADD CONSTRAINT `Question_categoryName_fkey` FOREIGN KEY (`categoryName`) REFERENCES `Category`(`name`) ON DELETE SET NULL ON UPDATE CASCADE;
