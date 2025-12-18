"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/core/components/ui/dialog";
import { Button } from "@/core/components/ui/button";
import Papa from "papaparse";
import { useNotification } from "@/core/components/shared/notification/use-notification-provider";
import { useDataProvider } from "@refinedev/core";

export const ImportDialog: React.FC<{
  open: boolean;
  onOpenChange: (v: boolean) => void;
  resource?: string;
}> = ({ open, onOpenChange, resource }) => {
  const notify = useNotification?.();
  const getDataProvider = useDataProvider();
  const dataProvider = getDataProvider();

  const handleFile = (file?: File) => {
    if (!file || !resource) return;
    Papa.parse(file, {
      header: true,
      complete: async (results) => {
        try {
          const records = results.data as Record<string, any>[];
          // You can map fields here according to resource schema
          // For now, try createMany if supported else create sequentially
          if ((dataProvider as any).createMany) {
            await (dataProvider as any).createMany?.({
              resource,
              variables: records,
            });
          } else {
            for (const r of records) {
              await dataProvider.create?.({ resource, variables: r });
            }
          }
          notify?.open({
            title: "Import complete",
            message: `${records.length} records imported.`,
            type: "success",
          });
          onOpenChange(false);
        } catch (err) {
          notify?.open({
            title: "Import failed",
            message: String(err),
            type: "error",
          });
        }
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Import {resource}</DialogTitle>
        </DialogHeader>

        <div className="py-4">
          <input
            type="file"
            accept=".csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
            onChange={(e) => handleFile(e.target.files?.[0])}
          />
        </div>

        <DialogFooter>
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
