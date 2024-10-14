-- CreateTable
CREATE TABLE "Word" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "Word_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ConjugationCategory" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "ConjugationCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Conjugation" (
    "id" SERIAL NOT NULL,
    "wordId" INTEGER NOT NULL,
    "conjugationCategoryId" INTEGER NOT NULL,

    CONSTRAINT "Conjugation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Language" (
    "slug" TEXT NOT NULL,

    CONSTRAINT "Language_pkey" PRIMARY KEY ("slug")
);

-- CreateTable
CREATE TABLE "ConjugationTranslation" (
    "id" SERIAL NOT NULL,
    "lang" TEXT NOT NULL,
    "translation" TEXT NOT NULL,
    "conjugationId" INTEGER NOT NULL,

    CONSTRAINT "ConjugationTranslation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ConjugationTranslation_conjugationId_key" ON "ConjugationTranslation"("conjugationId");

-- AddForeignKey
ALTER TABLE "Conjugation" ADD CONSTRAINT "Conjugation_wordId_fkey" FOREIGN KEY ("wordId") REFERENCES "Word"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Conjugation" ADD CONSTRAINT "Conjugation_conjugationCategoryId_fkey" FOREIGN KEY ("conjugationCategoryId") REFERENCES "ConjugationCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConjugationTranslation" ADD CONSTRAINT "ConjugationTranslation_lang_fkey" FOREIGN KEY ("lang") REFERENCES "Language"("slug") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConjugationTranslation" ADD CONSTRAINT "ConjugationTranslation_conjugationId_fkey" FOREIGN KEY ("conjugationId") REFERENCES "Conjugation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
