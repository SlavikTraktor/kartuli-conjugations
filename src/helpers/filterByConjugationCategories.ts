import { ConjugationCategories } from "@/consts/ConjugationCategories";

export const filterByConjugationCategories = (
  categories: ConjugationCategories[],
  data: {
    id: number;
    value: string;
    wordId: number;
    conjugationCategorySlug: string;
  }[],
) => {
  return categories.map((v) => ({ category: v, data: data.find((d) => d.conjugationCategorySlug === v) }));
};
