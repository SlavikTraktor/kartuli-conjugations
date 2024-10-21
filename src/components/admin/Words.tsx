"use client";

import Link from "next/link";
import { mainConjugationName } from "@/consts/structure";
import { List, Button } from "antd";
import { useCallback, useState } from "react";

export interface WordsProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  words: any[];
}

export const Words = ({ words: wordsExternal }: WordsProps) => {
  const [words, setWords] = useState(wordsExternal);

  const onAdd = async () => {
    const res = await fetch("/api/word/new", {
      method: "POST",
    });
    const resBody = await res.json();
    setWords([...words, resBody]);
  };

  const onRemove = async (id: number) => {
    console.log("remove", id);
    // const res = await fetch("/api/word/remove", {
    //   method: "POST",
    // });
    // const resBody = await res.json();
    // setWords([...words, resBody]);
  };

  const renderItem = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (word: any) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const main = word.conjugations.find((v: any) => v.conjugationCategorySlug === mainConjugationName);
      return (
        <List.Item key={word.id}>
          <div className="flex w-full flex-wrap">
            <div className="min-w-10">
              <Link href={`/admin/word/${word.id}`}>{word.id}</Link>
            </div>
            <div className="min-w-24">Count: {word.conjugations.length}</div>
            <div className="flex-1 min-w-24">
              {main && (
                <Link href={`/admin/word/${word.id}`}>
                  {main.value} - <span className="text-amber-600">{main.translations[0]?.value}</span>
                </Link>
              )}
            </div>
            <div>
              <Button size="small" className="ml-2 text-rose-600" onClick={() => onRemove(word.id)}>
                X
              </Button>
            </div>
          </div>
        </List.Item>
      );
    },
    [],
  );
  return (
    <div>
      <List bordered dataSource={words} renderItem={renderItem} />
      <div className="mt-2">
        <Button className="ml-2" onClick={onAdd}>
          New
        </Button>
      </div>
    </div>
  );
};
