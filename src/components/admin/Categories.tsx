"use client";

import { List, Input, Button } from "antd";
import { useCallback, useState } from "react";

export interface CategoriesProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  categories: any[];
}

export const Categories = ({ categories: categoriesExternal }: CategoriesProps) => {
  const [categories, setCategories] = useState(categoriesExternal);
  const [drafts, setDrafts] = useState<{ id: number; slug: string }[]>([]);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const updateDrafts = (id: number, slug: string) => {
    setDrafts((drafts) => {
      const i = drafts.findIndex((v) => v.id === id);
      if (i === -1) {
        return [...drafts, { id, slug }];
      } else {
        drafts[i] = { id, slug };
        return [...drafts];
      }
    });
  };

  console.log(drafts);

  const addNew = async () => {
    const res = await fetch("/api/category/new", {
      method: "POST",
    });
    const resBody = await res.json();
    setCategories([...categories, resBody]);
  };
  const save = async () => {
    setIsSaving(true);
    await fetch("/api/category/save", {
      body: JSON.stringify(drafts),
      method: "POST",
    });
    setIsSaving(false);
    setDrafts([]);
  };

  const renderItem = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (category: any) => (
      <List.Item>
        <div className="flex w-full flex-wrap">
          <div className="min-w-10">{category.id}</div>
          <div className="flex-1 min-w-24">
            <Input
              className="w-64"
              defaultValue={category.slug}
              onChange={(v) => updateDrafts(category.id, v.currentTarget.value)}
            />
          </div>
          <div className="flex-1 min-w-24">Count: {category.conjugation.length}</div>
        </div>
      </List.Item>
    ),
    [],
  );
  return (
    <div>
      <List bordered dataSource={categories} renderItem={renderItem} />
      <div className="mt-2">
        <Button disabled={drafts.length === 0 && !isSaving} onClick={save}>
          Save
        </Button>
        <Button className="ml-2" onClick={addNew}>
          New
        </Button>
      </div>
    </div>
  );
};
