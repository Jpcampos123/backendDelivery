/*
  Warnings:

  - Added the required column `like` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `qtd` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `serve` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `products` ADD COLUMN `like` BOOLEAN NOT NULL,
    ADD COLUMN `qtd` INTEGER NOT NULL,
    ADD COLUMN `serve` INTEGER NOT NULL,
    ADD COLUMN `total` DECIMAL(65, 30) NOT NULL;
