import type { ReactNode } from "react";
import type { BaseRecord } from "@refinedev/core";

export type ListColumnConfig<TRecord extends BaseRecord = BaseRecord> = {
  /**
   * Field key on the record. Can be a simple path (e.g. "name").
   * For more complex shapes prefer the `accessor` callback.
   */
  key: string;

  /** i18n key for the header label. */
  labelKey?: string;
  /** Fallback label when no i18n key is provided. */
  label?: string;

  /** Optional fixed width for the column. */
  width?: number | string;

  /** Whether this column is sortable. */
  sortable?: boolean;

  /** Hide this column from the table. */
  hidden?: boolean;

  /** Horizontal text alignment. */
  align?: "left" | "center" | "right";

  /**
   * Custom accessor for the raw value. If provided, this takes
   * precedence over `key` when resolving the displayed value.
   */
  accessor?: (record: TRecord) => unknown;

  /**
   * Value-level formatter, e.g. to format dates or numbers while
   * still rendering as plain text.
   */
  renderValue?: (value: unknown, record: TRecord) => ReactNode;

  /**
   * Full custom cell renderer. Use when you want to render badges,
   * avatars, composed fields, etc. If provided, `renderValue` is
   * ignored and this has full control of the cell.
   */
  cell?: (record: TRecord) => ReactNode;
};

export type ListRowClickMode = "show" | "edit" | "none";

export type ListViewConfig<TRecord extends BaseRecord = BaseRecord> = {
  /** Refine resource name (e.g. "users"). Optional when inferred from route. */
  resource?: string;

  /** Optional i18n key and fallback title for the page header. */
  titleKey?: string;
  title?: string;

  /** Initial sort configuration. */
  defaultSort?: {
    field: string;
    order: "asc" | "desc";
  };

  /** Column definitions. */
  columns: ListColumnConfig<TRecord>[];

  /** Show selection checkbox column. */
  selectable?: boolean;

  /**
   * Row click behavior. When a function is provided it receives the
   * record and is responsible for navigation.
   */
  rowClick?: ListRowClickMode | ((record: TRecord) => void);

  /** Optional page size options for pagination. */
  pageSizeOptions?: number[];
};
