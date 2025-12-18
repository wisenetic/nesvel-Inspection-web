"use client";

import type React from "react";

import { cn } from "@/core/lib/utils";

type AuthPageLayoutProps = React.PropsWithChildren<
  React.ComponentProps<"div"> & {
    contentClassName?: string;
  }
>;

export function AuthPageLayout({
  className,
  contentClassName,
  children,
  ...props
}: AuthPageLayoutProps) {
  return (
    <div
      className={cn(
        "bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10",
        className,
      )}
      {...props}
    >
      <div className={cn("w-full max-w-sm md:max-w-4xl", contentClassName)}>
        {children}
      </div>
    </div>
  );
}
