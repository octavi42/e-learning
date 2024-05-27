-- DropForeignKey
ALTER TABLE `Links` DROP FOREIGN KEY `Links_resourcesId_fkey`;

-- AlterTable
ALTER TABLE `Links` MODIFY `resourcesId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Links` ADD CONSTRAINT `Links_resourcesId_fkey` FOREIGN KEY (`resourcesId`) REFERENCES `Resources`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
