"use client";
import { AutoComplete, AutoCompleteProps } from "antd";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { isKartuliString } from "@/helpers/isKartuliString";

export const Search = () => {
  const [options, setOptions] = useState<AutoCompleteProps["options"]>([]);
  const [value, setValue] = useState<string>("");
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
        <div key={v.conjugation}>
          <span className="mr-4">{v.conjugation}</span>
          <span className="text-amber-600">{v.translation}</span>
        </div>
      ),
      value: v.conjugation,
      initialData: v,
    }));
    setIsLoading(false);
    // const opts = optionsRaw.filter((v) => (v.value as string).includes(search));
    setOptions(resOptions);
  };

  const onSelect = (v: string, v2: any) => {
    router.push(`/word/${v2.initialData.wordId}`);
    const isKartuli = isKartuliString(value);
    setValue(isKartuli ? v : v2.initialData.translation);
  };
  return (
    <AutoComplete
      value={value}
      onChange={(v) => setValue(v)}
      onSearch={onSearch}
      onSelect={onSelect}
      options={options}
      className="w-80 mb-10"
    />
  );
};
