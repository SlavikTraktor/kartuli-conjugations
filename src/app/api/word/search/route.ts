import { kartuliAlphabet } from "@/consts/kartuliAlphabet";
import { prisma } from "@/lib/prisma";

interface SearchResult {
  wordId: number;
  conjugation: string;
  translation?: string;
}

export async function POST(request: Request) {
  const { search } = await request.json();
  const isKartuli = kartuliAlphabet.split("").some((v) => search.includes(v));

  if (isKartuli) {
    const searchResult = await prisma.conjugation.findMany({
      where: {
        value: {
          contains: search,
        },
      },
      take: 8,
      include: {
        word: true,
        translation: true,
      },
      orderBy: {
        id: "asc"
      }
    });

    const res: SearchResult[] = searchResult.map((v) => ({
      conjugation: v.value,
      translation: v.translation?.value,
      wordId: v.wordId,
    }));
    return Response.json(res);
  }

  const searchResult = await prisma.conjugationTranslation.findMany({
    where: {
      lang: "en",
      value: {
        contains: search,
      },
    },
    take: 7,
    include: {
      conjugation: {
        include: {
          word: true,
        },
      },
    },
  });

  const res: SearchResult[] = searchResult.map((v) => ({
    conjugation: v.conjugation.value,
    translation: v.value,
    wordId: v.conjugation.wordId,
  }));

  return Response.json(res);
}
