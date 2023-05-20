/*
  Warnings:

  - You are about to alter the column `price` on the `products` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Decimal(9,2)`.

*/
-- AlterTable
ALTER TABLE `products` MODIFY `price` DECIMAL(9, 2) NOT NULL;
