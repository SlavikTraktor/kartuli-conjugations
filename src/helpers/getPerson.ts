import { ConjugationCategories, conjugationPersonMap } from "@/consts/ConjugationCategories";
import _ from "lodash";

export const getPerson = (conjugationCategory: ConjugationCategories) => {
  const pesonKeys = _.keys(conjugationPersonMap);
  const personKey = pesonKeys.find((v) => conjugationCategory.endsWith(v));
  return personKey ? conjugationPersonMap[personKey] : "";
};
