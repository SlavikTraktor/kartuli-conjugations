import { AllConjugations } from "@/components/admin/AllConjugations";
import { prisma } from "@/lib/prisma";

export default async function Word({ params }: { params: { id: string } }) {
  const word = await prisma.word.findFirst({
    where: { id: +params.id },
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

  if (!word) {
    return (
      <main>
        <div className="p-4">Word {params.id} not found</div>
      </main>
    );
  }

  return (
    <main>
      <div className="p-4">Word {params.id}</div>
      <AllConjugations word={word} />
    </main>
  );
}
