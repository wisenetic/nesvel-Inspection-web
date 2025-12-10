"use client";

import React from "react";
import { Page } from "../page/Page";
import { ActionBar } from "../page-actions/ActionBar";

export type FormPageProps = {
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
  resource?: string;
  actions?: React.ReactNode;
};

export const FormPage: React.FC<FormPageProps> = ({
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
      actions={actions ?? <ActionBar pageType="form" resource={resource} />}
    >
      <Page.Content>{children}</Page.Content>
    </Page>
  );
};
