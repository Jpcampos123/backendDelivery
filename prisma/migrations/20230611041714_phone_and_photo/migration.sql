/*
  Warnings:

  - Added the required column `phone` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `photo` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `users` ADD COLUMN `phone` VARCHAR(191) NOT NULL,
    ADD COLUMN `photo` VARCHAR(191) NOT NULL;
