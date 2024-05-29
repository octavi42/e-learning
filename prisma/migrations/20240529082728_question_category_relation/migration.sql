/*
  Warnings:

  - You are about to drop the column `categoryName` on the `Question` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[order,categoryId]` on the table `Question` will be added. If there are existing duplicate values, this will fail.
  - The required column `id` was added to the `Category` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `categoryId` to the `Question` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Question` DROP FOREIGN KEY `Question_categoryName_fkey`;

-- DropIndex
DROP INDEX `Question_order_categoryName_key` ON `Question`;

-- AlterTable
ALTER TABLE `Category` ADD COLUMN `id` VARCHAR(191) NOT NULL,
    MODIFY `order` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Question` DROP COLUMN `categoryName`,
    ADD COLUMN `categoryId` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Question_order_categoryId_key` ON `Question`(`order`, `categoryId`);

-- AddForeignKey
ALTER TABLE `Question` ADD CONSTRAINT `Question_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
