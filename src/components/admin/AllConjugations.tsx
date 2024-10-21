"use client";

import { conjugationRowGroups, mainConjugationName } from "@/consts/structure";
import { filterByConjugationCategories } from "@/helpers/filterByConjugationCategories";
import { ConjugationList } from "./ConjugationList";
import { Button, Input } from "antd";
import { useCallback, useState } from "react";

export interface AllConjugationsProps {
  word: any;
}

export const AllConjugations = ({ word }: AllConjugationsProps) => {
  const [conjugations, setConjugations] = useState(word.conjugations);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [drafts, setDrafts] = useState<any[]>([]);
  const main = conjugations.find((v: any) => v.conjugationCategorySlug === mainConjugationName);

  console.log(drafts);

  const onUpdateConjugation = useCallback(
    (categorySlug: string, value: string) => {
      setDrafts((drafts) => {
        const conjugation = conjugations.find((v: any) => v.conjugationCategorySlug === categorySlug);
        const conjugationId: number | undefined = conjugation?.id;
        const draftIndex = drafts.findIndex((v) => v.categorySlug === categorySlug);
        if (draftIndex === -1) {
          return [
            ...drafts,
            {
              id: conjugationId,
              categorySlug,
              value,
              translation: conjugation?.translation?.value || "",
            },
          ];
        } else {
          drafts[draftIndex] = {
            ...drafts[draftIndex],
            value,
          };
          return [...drafts];
        }
      });
    },
    [conjugations],
  );

  const onUpdateTranslation = useCallback(
    (categorySlug: string, translation: string) => {
      setDrafts((drafts) => {
        const conjugation = conjugations.find((v: any) => v.conjugationCategorySlug === categorySlug);
        const conjugationId: number | undefined = conjugation?.id;
        const draftIndex = drafts.findIndex((v) => v.categorySlug === categorySlug);
        if (draftIndex === -1) {
          return [
            ...drafts,
            {
              id: conjugationId,
              categorySlug,
              value: conjugation?.value || "",
              translation,
            },
          ];
        } else {
          drafts[draftIndex] = {
            ...drafts[draftIndex],
            translation,
          };
          return [...drafts];
        }
      });
    },
    [conjugations],
  );

  const onSave = async () => {
    setIsSaving(true);
    await fetch("/api/conjugation/upsert", {
      body: JSON.stringify({
        wordId: word.id,
        language: "en",
        conjugations: drafts,
      }),
      method: "POST",
    });

    const resWordRaw = await fetch(`/api/word/${word.id}`);
    const resWord = await resWordRaw.json();
    setConjugations(resWord.conjugations);
    setIsSaving(false);
  };
  return (
    <div>
      <div className="mb-4">
        <Button disabled={isSaving || drafts.length === 0} onClick={onSave}>
          Save
        </Button>
      </div>
      <div className="flex gap-4 mb-3">
        <Input
          className="w-64"
          defaultValue={main?.value}
          placeholder="Conjugation"
          onChange={(e) => onUpdateConjugation(mainConjugationName, e.currentTarget.value)}
        />
        <Input
          className="w-64 text-amber-600"
          defaultValue={main?.translations[0]?.value}
          placeholder="Translation"
          onChange={(e) => onUpdateTranslation(mainConjugationName, e.currentTarget.value)}
        />
      </div>
      <div className="flex flex-wrap gap-4">
        {conjugationRowGroups.map((v) => (
          <ConjugationList
            key={v.name}
            name={v.name}
            dataSource={filterByConjugationCategories(v.rowKeys, word.conjugations)}
            setConjugation={onUpdateConjugation}
            setTranslation={onUpdateTranslation}
          />
        ))}
      </div>
    </div>
  );
};
