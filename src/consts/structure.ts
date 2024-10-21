import { ConjugationCategories } from "./ConjugationCategories";

export const mainConjugationName = ConjugationCategories.verbNoun;
export const conjugationRowGroups = [
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
  {
    name: "Future",
    rowKeys: [
      ConjugationCategories.future_1,
      ConjugationCategories.future_2,
      ConjugationCategories.future_3,
      ConjugationCategories.future_1_plural,
      ConjugationCategories.future_2_plural,
      ConjugationCategories.future_3_plural,
    ],
  },
];