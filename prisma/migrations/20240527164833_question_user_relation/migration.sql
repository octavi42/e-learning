/*
  Warnings:

  - A unique constraint covering the columns `[questionId,userId]` on the table `Answer` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Answer_questionId_userId_key` ON `Answer`(`questionId`, `userId`);
