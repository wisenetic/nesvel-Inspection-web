"use client";

// Backwards-compatible re-export of shared list view primitives so we can
// gradually remove the refine-ui folder without breaking imports.
export {
  ListView,
  ListViewHeader,
} from "@/core/components/shared/views/list/list-view";
