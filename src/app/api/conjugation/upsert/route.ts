import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const { wordId, language, conjugations } = await request.json();

  const word = await prisma.word.findFirst({
    where: {
      id: wordId,
    },
  });
  if (!word) {
    return Response.json([]);
  }

  for (let i = 0; i < conjugations.length; i++) {
    if (conjugations[i].id !== undefined) {
      await updateConjugation(conjugations[i], language);
    } else {
      await createConjugation(conjugations[i], wordId, language);
    }
  }

  return Response.json([]);
}

const updateConjugation = async (updatedConjugation: any, language: string) => {
  const conjugation = await prisma.conjugation.update({
    where: {
      id: updatedConjugation.id
    },
    data: {
      value: updatedConjugation.value
    }
  });

  await prisma.conjugationTranslation.upsert({
    where: {
      lang_conjugationId: {
        conjugationId: conjugation.id,
        lang: language,
      }
    },
    update: {
      value: updatedConjugation.translation
    },
    create: {
      value: updatedConjugation.translation,
      conjugationId: conjugation.id,
      lang: language,
    }
  })
};

const createConjugation = async (newConjugation: any, wordId: number, language: string) => {
  const conjugation = await prisma.conjugation.create({
    data: {
      value: newConjugation.value,
      conjugationCategorySlug: newConjugation.categorySlug,
      wordId,
    },
  });

  await prisma.conjugationTranslation.create({
    data: {
      conjugationId: conjugation.id,
      lang: language,
      value: newConjugation.translation,
    }
  })
};
