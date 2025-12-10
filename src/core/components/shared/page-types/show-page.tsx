"use client";

import React from "react";
import { Page } from "../page/Page";
import { ActionBar } from "../page-actions/ActionBar";

export type ShowPageProps = {
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
  resource?: string;
  actions?: React.ReactNode;
};

export const ShowPage: React.FC<ShowPageProps> = ({
  title,
  subtitle,
  children,
  resource,
  actions,
}) => {
  return (
    <Page
      title={title}
      subtitle={subtitle}
      actions={actions ?? <ActionBar pageType="show" resource={resource} />}
    >
      <Page.Content>{children}</Page.Content>
    </Page>
  );
};
