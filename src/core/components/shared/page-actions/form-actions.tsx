"use client";

import React from "react";
import { Button } from "@/core/components/ui/button";
import { useTranslate, useNavigation, useGetIdentity } from "@refinedev/core";
import { Save, Trash2, ArrowRight } from "lucide-react";
import { useFormContext } from "react-hook-form";

export const FormActions: React.FC<{
  resource?: string;
  className?: string;
}> = ({ resource }) => {
  const t = useTranslate?.() ?? ((s: string) => s);
  const nav = useNavigation();
  const form = useFormContext?.();

  // The actual form save/delete behavior is provided by module forms.
  // Here we only render common actions and delegate to form context or callbacks passed via props.
  return (
    <div className="flex items-center gap-2">
      <Button
        variant="primary"
        size="sm"
        onClick={() => form?.handleSubmit?.(form?.onSubmit ?? (() => {}))?.()}
      >
        <Save className="mr-2" />
        {t("actions.save") ?? "Save"}
      </Button>

      <Button
        variant="outline"
        size="sm"
        onClick={() =>
          form?.handleSubmit?.(form?.onSaveContinue ?? (() => {}))?.()
        }
      >
        {t("actions.save_and_continue") ?? "Save & continue"}
      </Button>

      <Button
        variant="ghost"
        size="sm"
        onClick={() => nav.push(resource ?? "")}
      >
        {t("actions.cancel") ?? "Cancel"}
      </Button>
    </div>
  );
};
