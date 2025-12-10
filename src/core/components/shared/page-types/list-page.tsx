"use client";

import React from "react";
import { Page } from "../page/Page";
import { ActionBar } from "../page-actions/ActionBar";
import type { ReactNode } from "react";

export type ListPageProps = {
  title?: string;
  subtitle?: string;
  filters?: ReactNode;
  children?: ReactNode;
  resource?: string; // Resource name for ActionBar context
  actions?: ReactNode; // optional override actions
};

export const ListPage: React.FC<ListPageProps> = ({
  title,
  subtitle,
  filters,
  children,
  resource,
  actions,
}) => {
  return (
    <Page
      title={title}
      subtitle={subtitle}
      actions={actions ?? <ActionBar pageType="list" resource={resource} />}
    >
      {filters && <Page.Filters>{filters}</Page.Filters>}
      <Page.Content>{children}</Page.Content>
    </Page>
  );
};
