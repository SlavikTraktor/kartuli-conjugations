"use client";
import { AutoComplete, AutoCompleteProps } from "antd";
import { useState } from "react";
import { useRouter } from "next/navigation";

export const Search = () => {
  const [options, setOptions] = useState<AutoCompleteProps["options"]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onSearch = async (search: string) => {
    if (search === "") {
      setOptions([]);
      return;
    }
    setIsLoading(true);
    const res = await fetch("/api/word/search", {
      body: JSON.stringify({
        search,
      }),
      method: "POST",
    });
    const resBody = await res.json();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const resOptions = resBody.map((v: any) => ({
      label: (
        <div>
          <span className="mr-4">{v.conjugation}</span>
          <span className="text-amber-600">{v.translation}</span>
        </div>
      ),
      value: v.wordId,
    }));
    setIsLoading(false);
    // const opts = optionsRaw.filter((v) => (v.value as string).includes(search));
    setOptions(resOptions);
  };

  const onSelect = (v: number) => {
    router.push(`/word/${v}`);
  };
  return <AutoComplete onSearch={onSearch} onSelect={onSelect} options={options} className="w-80 mb-10" />;
};
