-- CreateTable
CREATE TABLE `agent` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `agent_name` VARCHAR(191) NULL,
    `business_registration_number` VARCHAR(191) NULL,
    `agent_address` VARCHAR(191) NULL,
    `agent_telephone` VARCHAR(191) NULL,
    `agent_email` VARCHAR(191) NULL,
    `agent_username` VARCHAR(191) NULL,
    `agent_password` VARCHAR(191) NULL,

    UNIQUE INDEX `agent_business_registration_number_key`(`business_registration_number`),
    UNIQUE INDEX `agent_agent_username_key`(`agent_username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `purchaser` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nic` VARCHAR(191) NOT NULL,
    `purchaser_name` VARCHAR(191) NULL,
    `purchaser_address` VARCHAR(191) NULL,
    `dob` DATETIME(3) NOT NULL,
    `is_first_property` BOOLEAN NOT NULL,
    `is_sri_lankan_resident` BOOLEAN NOT NULL,
    `is_company` BOOLEAN NOT NULL,
    `agent_id` INTEGER NOT NULL,

    UNIQUE INDEX `purchaser_nic_key`(`nic`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `purchase_transaction` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `property_address` VARCHAR(191) NULL,
    `type` VARCHAR(191) NOT NULL,
    `consideration` DECIMAL(10, 2) NOT NULL,
    `effective_date` DATETIME(3) NOT NULL,
    `vendor_name` VARCHAR(191) NULL,
    `vendor_nic` VARCHAR(191) NOT NULL,
    `vendor_agent_name` VARCHAR(191) NULL,
    `vendor_agent_address` VARCHAR(191) NULL,
    `purchaser_id` INTEGER NOT NULL,

    UNIQUE INDEX `purchase_transaction_property_address_key`(`property_address`),
    UNIQUE INDEX `purchase_transaction_vendor_nic_key`(`vendor_nic`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `edt_return` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` VARCHAR(191) NOT NULL,
    `tax_due` DECIMAL(10, 2) NOT NULL,
    `submit_date` DATETIME(3) NOT NULL,
    `deadline_date` DATETIME(3) NOT NULL,
    `status` ENUM('FILED', 'CANCELLED', 'PAID', 'COMPLETED') NOT NULL DEFAULT 'FILED',
    `transaction_id` INTEGER NOT NULL,
    `agent_id` INTEGER NOT NULL,

    UNIQUE INDEX `edt_return_transaction_id_key`(`transaction_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `receiver` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nic` VARCHAR(191) NOT NULL,
    `receiver_name` VARCHAR(191) NULL,
    `receiver_address` VARCHAR(191) NULL,
    `dob` DATETIME(3) NOT NULL,
    `is_first_property` BOOLEAN NOT NULL,
    `is_sri_lankan_resident` BOOLEAN NOT NULL,
    `is_company` BOOLEAN NOT NULL,
    `agent_id` INTEGER NOT NULL,

    UNIQUE INDEX `receiver_nic_key`(`nic`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `gift_transaction` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `property_address` VARCHAR(191) NULL,
    `type` VARCHAR(191) NOT NULL,
    `consideration` DECIMAL(10, 2) NOT NULL,
    `effective_date` DATETIME(3) NOT NULL,
    `giver_name` VARCHAR(191) NULL,
    `giver_nic` VARCHAR(191) NOT NULL,
    `receiver_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `gift_return` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` VARCHAR(191) NOT NULL,
    `tax_due` DECIMAL(10, 2) NOT NULL,
    `submit_date` DATETIME(3) NOT NULL,
    `deadline_date` DATETIME(3) NOT NULL,
    `status` ENUM('FILED', 'CANCELLED', 'PAID', 'COMPLETED') NOT NULL DEFAULT 'FILED',
    `transaction_id` INTEGER NOT NULL,
    `agent_id` INTEGER NOT NULL,

    UNIQUE INDEX `gift_return_transaction_id_key`(`transaction_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `beneficiary` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nic` VARCHAR(191) NOT NULL,
    `beneficiary_name` VARCHAR(191) NULL,
    `beneficiary_address` VARCHAR(191) NULL,
    `dob` DATETIME(3) NOT NULL,
    `is_first_property` BOOLEAN NOT NULL,
    `is_sri_lankan_resident` BOOLEAN NOT NULL,
    `is_company` BOOLEAN NOT NULL,
    `agent_id` INTEGER NOT NULL,

    UNIQUE INDEX `beneficiary_nic_key`(`nic`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `inheritance_transaction` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `property_address` VARCHAR(191) NULL,
    `type` VARCHAR(191) NOT NULL,
    `consideration` DECIMAL(10, 2) NOT NULL,
    `effective_date` DATETIME(3) NOT NULL,
    `decedent_name` VARCHAR(191) NULL,
    `decedent_nic` VARCHAR(191) NOT NULL,
    `beneficiary_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `inheritance_return` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` VARCHAR(191) NOT NULL,
    `tax_due` DECIMAL(10, 2) NOT NULL,
    `submit_date` DATETIME(3) NOT NULL,
    `deadline_date` DATETIME(3) NOT NULL,
    `status` ENUM('FILED', 'CANCELLED', 'PAID', 'COMPLETED') NOT NULL DEFAULT 'FILED',
    `transaction_id` INTEGER NOT NULL,
    `agent_id` INTEGER NOT NULL,

    UNIQUE INDEX `inheritance_return_transaction_id_key`(`transaction_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `payment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `amount` DECIMAL(10, 2) NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `paid_date` DATETIME(3) NOT NULL,
    `edt_return_id` INTEGER NOT NULL,
    `gift_return_id` INTEGER NOT NULL,
    `inheritance_return_id` INTEGER NOT NULL,

    UNIQUE INDEX `payment_edt_return_id_key`(`edt_return_id`),
    UNIQUE INDEX `payment_gift_return_id_key`(`gift_return_id`),
    UNIQUE INDEX `payment_inheritance_return_id_key`(`inheritance_return_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `penalty` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `reason` VARCHAR(191) NULL,
    `amount` DECIMAL(10, 2) NOT NULL,
    `imposed_date` DATETIME(3) NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `payment_id` INTEGER NOT NULL,

    UNIQUE INDEX `penalty_payment_id_key`(`payment_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `feedback` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `feedback` VARCHAR(191) NOT NULL,
    `rating` INTEGER NOT NULL,
    `status` ENUM('PENDING', 'RESPONDED') NOT NULL DEFAULT 'PENDING',
    `response` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `purchaser` ADD CONSTRAINT `purchaser_agent_id_fkey` FOREIGN KEY (`agent_id`) REFERENCES `agent`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `purchase_transaction` ADD CONSTRAINT `purchase_transaction_purchaser_id_fkey` FOREIGN KEY (`purchaser_id`) REFERENCES `purchaser`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `edt_return` ADD CONSTRAINT `edt_return_transaction_id_fkey` FOREIGN KEY (`transaction_id`) REFERENCES `purchase_transaction`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `edt_return` ADD CONSTRAINT `edt_return_agent_id_fkey` FOREIGN KEY (`agent_id`) REFERENCES `agent`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `receiver` ADD CONSTRAINT `receiver_agent_id_fkey` FOREIGN KEY (`agent_id`) REFERENCES `agent`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `gift_transaction` ADD CONSTRAINT `gift_transaction_receiver_id_fkey` FOREIGN KEY (`receiver_id`) REFERENCES `receiver`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `gift_return` ADD CONSTRAINT `gift_return_transaction_id_fkey` FOREIGN KEY (`transaction_id`) REFERENCES `gift_transaction`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `gift_return` ADD CONSTRAINT `gift_return_agent_id_fkey` FOREIGN KEY (`agent_id`) REFERENCES `agent`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `beneficiary` ADD CONSTRAINT `beneficiary_agent_id_fkey` FOREIGN KEY (`agent_id`) REFERENCES `agent`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `inheritance_transaction` ADD CONSTRAINT `inheritance_transaction_beneficiary_id_fkey` FOREIGN KEY (`beneficiary_id`) REFERENCES `beneficiary`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `inheritance_return` ADD CONSTRAINT `inheritance_return_transaction_id_fkey` FOREIGN KEY (`transaction_id`) REFERENCES `inheritance_transaction`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `inheritance_return` ADD CONSTRAINT `inheritance_return_agent_id_fkey` FOREIGN KEY (`agent_id`) REFERENCES `agent`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `payment` ADD CONSTRAINT `payment_edt_return_id_fkey` FOREIGN KEY (`edt_return_id`) REFERENCES `edt_return`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `payment` ADD CONSTRAINT `payment_gift_return_id_fkey` FOREIGN KEY (`gift_return_id`) REFERENCES `gift_return`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `payment` ADD CONSTRAINT `payment_inheritance_return_id_fkey` FOREIGN KEY (`inheritance_return_id`) REFERENCES `inheritance_return`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `penalty` ADD CONSTRAINT `penalty_payment_id_fkey` FOREIGN KEY (`payment_id`) REFERENCES `payment`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
