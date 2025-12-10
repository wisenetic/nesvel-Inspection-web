"use client";

import React from "react";
import { cn } from "@/core/lib/utils";
import type { ReactNode } from "react";
import { PageHeader } from "./PageHeader";
import { PageFilters } from "./page-filters";
import { PageContent } from "./page-content";
import { PageFooter } from "./page-footer";

export type PageProps = {
  className?: string;
  children?: ReactNode;
  title?: string;
  subtitle?: string;
  actions?: ReactNode;
  /**
   * Optional: show default container padding or keep full-bleed
   */
  padded?: boolean;
};

export const Page: React.FC<PageProps> & {
  Header: typeof PageHeader;
  Filters: typeof PageFilters;
  Content: typeof PageContent;
  Footer: typeof PageFooter;
} = ({ children, className, title, subtitle, actions, padded = true }) => {
  return (
    <div className={cn("w-full", className)}>
      {(title || subtitle || actions) && (
        <PageHeader title={title} subtitle={subtitle} actions={actions} />
      )}
      <div className={cn(padded ? "p-6 md:p-8" : "", "space-y-6")}>
        {children}
      </div>
    </div>
  );
};

Page.Header = PageHeader;
Page.Filters = PageFilters;
Page.Content = PageContent;
Page.Footer = PageFooter;

export default Page;
