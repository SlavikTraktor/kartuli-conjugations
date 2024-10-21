import { ConjugationList } from "@/components/ConjugationList";
import { mainConjugationName, conjugationRowGroups } from "@/consts/structure";
import { filterByConjugationCategories } from "@/helpers/filterByConjugationCategories";
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
  });

  if (!word) {
    return <div>Word with id {params.id} not found</div>;
  }

  const main = word.conjugations.find((v) => v.conjugationCategorySlug === mainConjugationName);

  return (
    <div>
      <h1>Word {params.id}</h1>
      {main && (
        <div>
          {main.value} - <span className="text-amber-600">{main.translations[0]?.value}</span>
        </div>
      )}
      <div className="flex flex-wrap gap-4">
        {conjugationRowGroups.map((v) => (
          <ConjugationList
            name={v.name}
            key={v.name}
            dataSource={filterByConjugationCategories(v.rowKeys, word.conjugations)}
          />
        ))}
      </div>
    </div>
  );
}
