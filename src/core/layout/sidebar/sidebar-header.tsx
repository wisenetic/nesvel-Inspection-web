"use client";

import { useSidebar } from "@/core/components/ui/sidebar";
import { useLink } from "@refinedev/core";
import { cn } from "@/core/lib/utils";
import { Command } from "lucide-react";
import { useTranslation } from "react-i18next";

type SidebarHeaderProps = {
  className?: string;

  /** Project branding text shown when sidebar expanded */
  brandName?: string;
  brandSubtitle?: string;

  /** Optional brand logo override */
  BrandIcon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

export const SidebarHeader = ({
  className,
  brandName = "Inspection Manager",
  brandSubtitle = "Enterprise",
  BrandIcon = Command,
}: SidebarHeaderProps) => {
  const { open } = useSidebar();
  const Link = useLink();
  const { t } = useTranslation();

  const finalBrand = t(`brand.name`, { defaultValue: brandName });
  const finalSubtitle = t(`brand.subtitle`, { defaultValue: brandSubtitle });

  return (
    <div
      className={cn(
        "h-16 flex items-center px-3 border-b border-border",
        className,
      )}
    >
      <Link
        to="/"
        className={cn(
          "flex items-center gap-3 no-underline",
          "transition-all duration-200",
        )}
      >
        {/* Brand Icon – stays visible even collapsed */}
        <div
          className={cn(
            "flex items-center justify-center size-9 rounded-lg",
            "bg-sidebar-primary text-sidebar-primary-foreground",
          )}
        >
          <BrandIcon className="size-5" />
        </div>

        {/* Brand Text — hide when collapsed */}
        <div
          className={cn(
            "flex flex-col text-left leading-tight",
            "transition-opacity duration-200",
            {
              "opacity-0 pointer-events-none": !open, // collapsed mode
              "opacity-100": open,
            },
          )}
        >
          <span className="font-semibold truncate">{finalBrand}</span>
          <span className="text-xs text-muted-foreground truncate">
            {finalSubtitle}
          </span>
        </div>
      </Link>
    </div>
  );
};
