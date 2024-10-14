export enum ConjugationCategories {
  present_1 = "present_1",
  present_2 = "present_2",
  present_3 = "present_3",
  present_1_plural = "present_1_plural",
  present_2_plural = "present_2_plural",
  present_3_plural = "present_3_plural",
}

export const conjugationPersonMap: Record<string, string> = {
  _1: "მე",
  _2: "შენ",
  _3: "ის",
  _1_plural: "ჩვენ",
  _2_plural: "თქვენ",
  _3_plural: "ისინი",
};
