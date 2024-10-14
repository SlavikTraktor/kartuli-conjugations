/*
  Warnings:

  - You are about to drop the column `conjugationCategoryId` on the `Conjugation` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[slug]` on the table `ConjugationCategory` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `conjugationCategorySlug` to the `Conjugation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Conjugation" DROP CONSTRAINT "Conjugation_conjugationCategoryId_fkey";

-- AlterTable
ALTER TABLE "Conjugation" DROP COLUMN "conjugationCategoryId",
ADD COLUMN     "conjugationCategorySlug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ConjugationCategory_slug_key" ON "ConjugationCategory"("slug");

-- AddForeignKey
ALTER TABLE "Conjugation" ADD CONSTRAINT "Conjugation_conjugationCategorySlug_fkey" FOREIGN KEY ("conjugationCategorySlug") REFERENCES "ConjugationCategory"("slug") ON DELETE RESTRICT ON UPDATE CASCADE;
