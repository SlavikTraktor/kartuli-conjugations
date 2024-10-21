"use client";

import { getPerson } from "@/helpers/getPerson";
import { Input, List } from "antd";
import { useCallback } from "react";

export interface ConjugationListProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dataSource: any[];
  name?: string;
  setConjugation?: (categorySlug: string, conjugation: string) => void;
  setTranslation?: (categorySlug: string, translation: string) => void;
}

export const ConjugationList = ({
  dataSource,
  name = "Present",
  setConjugation,
  setTranslation,
}: ConjugationListProps) => {
  const renderItem = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (item: any) => (
      <List.Item>
        <div className="flex w-full flex-wrap gap-2">
          <div className="min-w-14">{getPerson(item.category)}</div>
          <div className="flex-1 min-w-24">
            <Input
              defaultValue={item.data?.value}
              placeholder="Conjugation"
              onChange={(e) => setConjugation?.(item.category, e.currentTarget.value)}
            />
          </div>
          <div className="flex-1 min-w-24 ">
            <Input
              className="text-amber-600"
              defaultValue={item.data?.translations[0]?.value}
              placeholder="Translation"
              onChange={(e) => setTranslation?.(item.category, e.currentTarget.value)}
            />
          </div>
        </div>
      </List.Item>
    ),
    [setConjugation, setTranslation],
  );
  return (
    <div className="w-1/3">
      <h3>{name}</h3>
      <List bordered dataSource={dataSource} renderItem={renderItem} />
    </div>
  );
};
