"use client";

import type { PropsWithChildren } from "react";

import { CreateButton } from "@/core/components/refine-ui/buttons/create";
import { Breadcrumb } from "@/core/components/refine-ui/layout/breadcrumb";
import { Separator } from "@/core/components/ui/separator";
import { cn } from "@/core/lib/utils";
import { useResourceParams, useUserFriendlyName } from "@refinedev/core";

export type ListViewProps = PropsWithChildren<{
  className?: string;
}>;

export function ListView({ children, className }: ListViewProps) {
  return (
    <div className={cn("flex flex-col", "gap-4", className)}>{children}</div>
  );
}

export type ListHeaderProps = PropsWithChildren<{
  resource?: string;
  title?: string;
  canCreate?: boolean;
  headerClassName?: string;
  wrapperClassName?: string;
}>;

export const ListViewHeader = ({
  canCreate,
  resource: resourceFromProps,
  title: titleFromProps,
  wrapperClassName,
  headerClassName,
}: ListHeaderProps) => {
  const getUserFriendlyName = useUserFriendlyName();

  const { resource, identifier } = useResourceParams({
    resource: resourceFromProps,
  });
  const resourceName = identifier ?? resource?.name;

  const isCreateButtonVisible = canCreate ?? !!resource?.create;

  const title =
    titleFromProps ??
    getUserFriendlyName(
      resource?.meta?.label ?? identifier ?? resource?.name,
      "plural",
    );

  return (
    <div className={cn("flex flex-col", "gap-4", wrapperClassName)}>
      <div className={cn("flex", "justify-between", "gap-4", headerClassName)}>
        <h2 className="text-2xl font-bold">{title}</h2>
        {isCreateButtonVisible && (
          <div className="flex items-center gap-2">
            <CreateButton resource={resourceName} />
          </div>
        )}
      </div>
    </div>
  );
};

ListView.displayName = "ListView";
