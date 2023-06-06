/*
  Warnings:

  - You are about to drop the column `table` on the `orders` table. All the data in the column will be lost.
  - Made the column `name` on table `orders` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `orders` DROP COLUMN `table`,
    MODIFY `name` VARCHAR(191) NOT NULL;
