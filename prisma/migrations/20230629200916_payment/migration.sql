/*
  Warnings:

  - You are about to drop the column `payment_orderId` on the `items` table. All the data in the column will be lost.
  - You are about to drop the column `status_payment` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the `payment_orders` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `items` DROP FOREIGN KEY `items_payment_orderId_fkey`;

-- DropForeignKey
ALTER TABLE `payment_orders` DROP FOREIGN KEY `payment_orders_order_id_fkey`;

-- DropForeignKey
ALTER TABLE `payment_orders` DROP FOREIGN KEY `payment_orders_user_id_fkey`;

-- AlterTable
ALTER TABLE `items` DROP COLUMN `payment_orderId`;

-- AlterTable
ALTER TABLE `orders` DROP COLUMN `status_payment`;

-- DropTable
DROP TABLE `payment_orders`;

-- CreateTable
CREATE TABLE `payments` (
    `id` VARCHAR(191) NOT NULL,
    `status_payment` VARCHAR(191) NOT NULL,
    `payment_method` VARCHAR(191) NOT NULL,
    `total_paid_amount` INTEGER NOT NULL,
    `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `item_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `payments` ADD CONSTRAINT `payments_item_id_fkey` FOREIGN KEY (`item_id`) REFERENCES `items`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
