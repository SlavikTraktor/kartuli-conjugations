"use client";

import { getPerson } from "@/helpers/getPerson";
import { List } from "antd";
import { useCallback } from "react";

export interface ConjugationListProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dataSource: any[];
  name?: string;
}

export const ConjugationList = ({ dataSource, name = "Present" }: ConjugationListProps) => {
  const renderItem = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (item: any) => (
      <List.Item>
        <div className="flex w-full flex-wrap">
          <div className="min-w-14">{getPerson(item.category)}</div>
          <div className="flex-1 min-w-24">{item.data.value}</div>
          <div className="flex-1 min-w-24 text-amber-600">{item.data.translation?.value}</div>
        </div>
      </List.Item>
    ),
    [],
  );
  return (
    <div className="w-1/3">
      <h3>{name}</h3>
      <List bordered dataSource={dataSource} renderItem={renderItem} />
    </div>
  );
};
