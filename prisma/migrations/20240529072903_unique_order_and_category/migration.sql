/*
  Warnings:

  - A unique constraint covering the columns `[order,categoryName]` on the table `Question` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `Question_order_key` ON `Question`;

-- CreateIndex
CREATE UNIQUE INDEX `Question_order_categoryName_key` ON `Question`(`order`, `categoryName`);
