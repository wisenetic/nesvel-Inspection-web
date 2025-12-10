"use client";

import React from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/core/components/ui/select";
import { useTable, useTranslate, useList } from "@refinedev/core";
import { cn } from "@/core/lib/utils";

export const PaginationControls: React.FC<{ resource?: string }> = ({
  resource,
}) => {
  // useList or useTable depending on your integration approach
  const list = useList({ resource: resource ?? "" });
  const t = useTranslate?.() ?? ((s: string) => s);

  const page = list?.query?.data?.data
    ? list?.query?.data?.pagination?.current ?? 1
    : 1;
  const pageSize = list?.query?.data?.pagination?.pageSize ?? 10;
  const setPage = (p: number) => {
    list?.setPage?.(p);
  };
  const setPageSize = (s: number) => {
    list?.setPageSize?.(s);
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground">
        {t("table.rows_per_page") ?? "Rows"}
      </span>
      <Select
        value={String(pageSize)}
        onValueChange={(v) => setPageSize(Number(v))}
      >
        <SelectTrigger className="h-8 w-24">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="10">10</SelectItem>
          <SelectItem value="25">25</SelectItem>
          <SelectItem value="50">50</SelectItem>
          <SelectItem value="100">100</SelectItem>
        </SelectContent>
      </Select>

      <div className="text-sm text-muted-foreground">
        {t("pagination.page") ?? "Page"} {page}
      </div>
    </div>
  );
};
