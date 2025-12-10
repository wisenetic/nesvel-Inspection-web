"use client";

import React from "react";
import { Button } from "@/core/components/ui/button";
import { useTranslate, useCan, useNavigation } from "@refinedev/core";
import { Edit2, Trash2, Printer } from "lucide-react";

export const ShowActions: React.FC<{
  resource?: string;
  className?: string;
}> = ({ resource }) => {
  const t = useTranslate?.() ?? ((s: string) => s);
  const { data: canEdit } = useCan({
    action: "edit",
    resource: resource ?? "",
  });
  const { data: canDelete } = useCan({
    action: "delete",
    resource: resource ?? "",
  });
  const nav = useNavigation();

  return (
    <div className="flex items-center gap-2">
      {canEdit?.can && (
        <Button
          variant="primary"
          size="sm"
          onClick={() => nav.push(`${resource}/edit`)}
        >
          <Edit2 className="mr-2" />
          {t("actions.edit") ?? "Edit"}
        </Button>
      )}

      {canDelete?.can && (
        <Button variant="destructive" size="sm">
          <Trash2 className="mr-2" />
          {t("actions.delete") ?? "Delete"}
        </Button>
      )}

      <Button variant="ghost" size="sm" onClick={() => window.print()}>
        <Printer className="mr-2" />
        {t("actions.print") ?? "Print"}
      </Button>
    </div>
  );
};
