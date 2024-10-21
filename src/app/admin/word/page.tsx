import { Words as WordsList } from "@/components/admin/Words";
import { prisma } from "@/lib/prisma";

export default async function Words() {
  const words = await prisma.word.findMany({
    include: {
      conjugations: {
        include: {
          translations: true,
        },
      },
    },
    orderBy: {
      id: "asc",
    },
  });
  return (
    <main>
      <div className="p-4">Words</div>
      <WordsList words={words} />
    </main>
  );
}
