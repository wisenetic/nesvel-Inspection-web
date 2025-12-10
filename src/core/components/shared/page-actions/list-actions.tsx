"use client";

import React from "react";
import { Button } from "@/core/components/ui/button";
import { useNavigation, useCan, useTranslate } from "@refinedev/core";
import { Plus, Download, Upload, Printer, RefreshCw } from "lucide-react";
import { ExportUtils } from "@/core/utils/export-utils";
import { ImportDialog } from "./ImportDialog";
import { useState } from "react";
import { useList } from "@refinedev/core";
import { PaginationControls } from "@/core/components/pagination/PaginationControls";

export const ListActions: React.FC<{
  resource?: string;
  className?: string;
}> = ({ resource, className }) => {
  const t = useTranslate?.() ?? ((s: string) => s);
  const nav = useNavigation();
  const [importOpen, setImportOpen] = useState(false);

  // permission checks
  const { data: canCreate } = useCan({
    action: "create",
    resource: resource ?? "",
  });
  const { data: canExport } = useCan({
    action: "export",
    resource: resource ?? "",
  });
  const { data: canImport } = useCan({
    action: "import",
    resource: resource ?? "",
  });

  // table/list context to export current data: we use useList to access query params
  const listCtx = useList({ resource: resource ?? "" });

  const handleCreate = () => {
    if (!resource) return;
    nav.push(resource + "/create");
  };

  const handleExport = async () => {
    // gather current list data (could call dataProvider.getList with same params)
    const { data } = await listCtx.query?.refetch?.();
    const items = data?.data ?? [];
    ExportUtils.exportCSV(items, `${resource ?? "export"}.csv`);
  };

  return (
    <div className="flex items-center gap-2">
      <PaginationControls resource={resource} />

      {canCreate?.can && (
        <Button
          variant="primary"
          size="sm"
          onClick={handleCreate}
          leftIcon={<Plus />}
        >
          {t("actions.create") ?? "Create"}
        </Button>
      )}

      {canExport?.can && (
        <Button
          variant="ghost"
          size="sm"
          onClick={handleExport}
          leftIcon={<Download />}
        >
          {t("actions.export") ?? "Export"}
        </Button>
      )}

      {canImport?.can && (
        <>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setImportOpen(true)}
            leftIcon={<Upload />}
          >
            {t("actions.import") ?? "Import"}
          </Button>
          <ImportDialog
            open={importOpen}
            onOpenChange={setImportOpen}
            resource={resource}
          />
        </>
      )}

      <Button
        variant="ghost"
        size="sm"
        onClick={() => window.print()}
        leftIcon={<Printer />}
      >
        {t("actions.print") ?? "Print"}
      </Button>

      <Button
        variant="ghost"
        size="sm"
        onClick={() => window.location.reload()}
        leftIcon={<RefreshCw />}
      >
        {t("actions.refresh") ?? "Refresh"}
      </Button>
    </div>
  );
};
