/*
  Warnings:

  - You are about to drop the column `improvement` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `review` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `score` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `User` DROP COLUMN `improvement`,
    DROP COLUMN `review`,
    DROP COLUMN `score`;

-- CreateTable
CREATE TABLE `UserCategoryReview` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `categoryId` VARCHAR(191) NOT NULL,
    `review` TEXT NULL,
    `improvement` TEXT NULL,
    `score` INTEGER NULL,

    UNIQUE INDEX `UserCategoryReview_userId_categoryId_key`(`userId`, `categoryId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UserCategoryReview` ADD CONSTRAINT `UserCategoryReview_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserCategoryReview` ADD CONSTRAINT `UserCategoryReview_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
