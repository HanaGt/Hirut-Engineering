-- CreateEnum
CREATE TYPE "Category" AS ENUM ('HEAVY_MACHINERY', 'STRUCTURAL_STEEL', 'ELECTRICAL', 'PLUMBING', 'FINISHING_MATERIALS', 'SAFETY_EQUIPMENT', 'OTHER');

-- CreateTable
CREATE TABLE "ImportedItem" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" "Category" NOT NULL,
    "arrivalDate" TIMESTAMP(3) NOT NULL,
    "specs" TEXT NOT NULL,
    "imageUrl" TEXT,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "unit" TEXT NOT NULL DEFAULT 'unit',
    "available" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ImportedItem_pkey" PRIMARY KEY ("id")
);
