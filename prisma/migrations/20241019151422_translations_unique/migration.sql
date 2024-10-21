/*
  Warnings:

  - A unique constraint covering the columns `[lang,conjugationId]` on the table `ConjugationTranslation` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ConjugationTranslation_lang_conjugationId_key" ON "ConjugationTranslation"("lang", "conjugationId");
