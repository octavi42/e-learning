-- AlterTable
ALTER TABLE `Answer` MODIFY `rating` INTEGER NULL DEFAULT 0,
    MODIFY `answered_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
