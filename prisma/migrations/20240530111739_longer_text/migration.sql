-- AlterTable
ALTER TABLE `Links` MODIFY `link` TEXT NOT NULL,
    MODIFY `summary` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `UserCategoryReview` MODIFY `source` TEXT NULL;
