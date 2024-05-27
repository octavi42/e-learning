/*
  Warnings:

  - A unique constraint covering the columns `[order]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[order]` on the table `Question` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Category_order_key` ON `Category`(`order`);

-- CreateIndex
CREATE UNIQUE INDEX `Question_order_key` ON `Question`(`order`);
