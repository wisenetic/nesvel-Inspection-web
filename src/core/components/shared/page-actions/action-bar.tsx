"use client";

import React from "react";
import { cn } from "@/core/lib/utils";
import { useCan } from "@refinedev/core";
import { ListActions } from "./list-actions";
import { FormActions } from "./form-actions";
import { ShowActions } from "./show-actions";

export type ActionBarProps = {
  pageType: "list" | "form" | "show";
  resource?: string;
  className?: string;
};

export const ActionBar: React.FC<ActionBarProps> = ({
  pageType,
  resource,
  className,
}) => {
  // You can add global behavior here, e.g. analytics or telemetry
  if (pageType === "list")
    return <ListActions resource={resource} className={className} />;
  if (pageType === "form")
    return <FormActions resource={resource} className={className} />;
  return <ShowActions resource={resource} className={className} />;
};
