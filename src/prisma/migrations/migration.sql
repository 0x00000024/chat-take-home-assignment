-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
UNIQUE INDEX `User.email_unique`(`email`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `groupId` INTEGER NULL;

-- CreateTable
CREATE TABLE `Chat` (
                      `id` INTEGER NOT NULL AUTO_INCREMENT,
                      `chatId` VARCHAR(191) NOT NULL,
                      `name` VARCHAR(191) NOT NULL,

                      UNIQUE INDEX `Chat_chatId_key`(`chatId`),
                      PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Message` (
                         `id` INTEGER NOT NULL AUTO_INCREMENT,
                         `msgId` VARCHAR(191) NOT NULL,
                         `text` VARCHAR(191) NOT NULL,
                         `dialogId` VARCHAR(191) NOT NULL,
                         `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

                         UNIQUE INDEX `Message_msgId_key`(`msgId`),
                         PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Group` (
                       `id` INTEGER NOT NULL AUTO_INCREMENT,
                       `groupId` VARCHAR(191) NOT NULL,

                       UNIQUE INDEX `Group_groupId_key`(`groupId`),
                       PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ChatToUser` (
                             `A` INTEGER NOT NULL,
                             `B` INTEGER NOT NULL,

                             UNIQUE INDEX `_ChatToUser_AB_unique`(`A`, `B`),
                             INDEX `_ChatToUser_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_groupId_fkey` FOREIGN KEY (`groupId`) REFERENCES `Group`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Message` ADD CONSTRAINT `Message_dialogId_fkey` FOREIGN KEY (`dialogId`) REFERENCES `Chat`(`chatId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ChatToUser` ADD CONSTRAINT `_ChatToUser_A_fkey` FOREIGN KEY (`A`) REFERENCES `Chat`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ChatToUser` ADD CONSTRAINT `_ChatToUser_B_fkey` FOREIGN KEY (`B`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- RenameIndex
ALTER TABLE `User` RENAME INDEX `User.email_unique` TO `User_email_key`;

-- AlterTable
ALTER TABLE `Group` ADD COLUMN `name` VARCHAR(191) NOT NULL;
