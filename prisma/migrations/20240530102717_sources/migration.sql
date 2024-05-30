/*
  Warnings:

  - You are about to drop the column `resourcesId` on the `Links` table. All the data in the column will be lost.
  - You are about to drop the `Resources` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Links` DROP FOREIGN KEY `Links_resourcesId_fkey`;

-- DropForeignKey
ALTER TABLE `Resources` DROP FOREIGN KEY `Resources_answerId_fkey`;

-- AlterTable
ALTER TABLE `Links` DROP COLUMN `resourcesId`,
    ADD COLUMN `userCategoryReviewId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Question` ADD COLUMN `difficulty` ENUM('EASY', 'MEDIUM', 'HARD') NULL;

-- DropTable
DROP TABLE `Resources`;

-- AddForeignKey
ALTER TABLE `Links` ADD CONSTRAINT `Links_userCategoryReviewId_fkey` FOREIGN KEY (`userCategoryReviewId`) REFERENCES `UserCategoryReview`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
