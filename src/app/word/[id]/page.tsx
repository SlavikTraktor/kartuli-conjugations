import { ConjugationList } from "@/components/ConjugationList";
import { ConjugationCategories } from "@/consts/ConjugationCategories";
import { filterByConjugationCategories } from "@/helpers/filterByConjugationCategories";
import { prisma } from "@/lib/prisma";

const mainName = "verbNoun";
const rowGroups = [
  {
    name: "Present",
    rowKeys: [
      ConjugationCategories.present_1,
      ConjugationCategories.present_2,
      ConjugationCategories.present_3,
      ConjugationCategories.present_1_plural,
      ConjugationCategories.present_2_plural,
      ConjugationCategories.present_3_plural,
    ],
  },
];

export default async function Word({ params }: { params: { id: string } }) {
  const word = await prisma.word.findFirst({
    where: { id: +params.id },
    include: {
      words: {
        include: {
          translation: true,
        },
      },
    },
  });

  if (!word) {
    return <div>Word with id {params.id} not found</div>;
  }

  const main = word.words.find((v) => v.conjugationCategorySlug === mainName);

  return (
    <div>
      <h1>Word {params.id}</h1>
      {main && (
        <div>
          {main.value} - {main.translation?.value}
        </div>
      )}
      <div className="flex flex-wrap gap-4">
        <ConjugationList
          name={rowGroups[0].name}
          dataSource={filterByConjugationCategories(rowGroups[0].rowKeys, word.words)}
        />
        <ConjugationList
          name={rowGroups[0].name}
          dataSource={filterByConjugationCategories(rowGroups[0].rowKeys, word.words)}
        />
      </div>
    </div>
  );
}
