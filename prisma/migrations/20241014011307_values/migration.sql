/*
  Warnings:

  - You are about to drop the column `translation` on the `ConjugationTranslation` table. All the data in the column will be lost.
  - Added the required column `value` to the `Conjugation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `value` to the `ConjugationTranslation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Conjugation" ADD COLUMN     "value" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ConjugationTranslation" DROP COLUMN "translation",
ADD COLUMN     "value" TEXT NOT NULL;
