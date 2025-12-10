"use client";

import React from "react";
import { Button } from "@/core/components/ui/button";

export const BulkActions: React.FC<{
  selectedCount: number;
  onDelete?: () => void;
}> = ({ selectedCount, onDelete }) => {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground">
        {selectedCount} selected
      </span>

      <Button
        variant="destructive"
        size="sm"
        onClick={onDelete}
        disabled={selectedCount === 0}
      >
        Delete
      </Button>
    </div>
  );
};
