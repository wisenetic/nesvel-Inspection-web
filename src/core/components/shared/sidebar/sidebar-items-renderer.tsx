// src/core/components/shared/sidebar/sidebar-items-renderer.tsx
import * as React from "react";
import type { ElementType } from "react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarSeparator,
} from "@/core/components/ui/sidebar";

import { cn } from "@/core/lib/utils";
import type { DynamicSidebarStyles } from "./sidebar.types";
import type { SidebarItemConfig } from "./sidebar.types";

type SidebarItemsRendererProps = {
  items: SidebarItemConfig[];
  zone: "primary" | "secondary" | "footer";
  styles?: DynamicSidebarStyles;
  onNavigate?: (href: string) => void;
  renderIcon?: (
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>,
    ctx: { itemId: string },
  ) => React.ReactNode;
  renderItemContent?: (ctx: {
    id: string;
    title?: string;
    href?: string;
    isActive: boolean;
    defaultIcon: React.ReactNode | null;
  }) => React.ReactNode;
  LinkComponent: ElementType;
};

function DefaultContent({
  Icon,
  title,
  isActive,
  renderIcon,
  styles,
  itemId,
}: {
  Icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title?: string;
  isActive: boolean;
  renderIcon?: SidebarItemsRendererProps["renderIcon"];
  styles?: DynamicSidebarStyles;
  itemId: string;
}) {
  const defaultIcon = Icon ? (
    <Icon className={cn("h-4 w-4 mr-2", styles?.icon)} aria-hidden="true" />
  ) : null;

  return (
    <>
      {Icon && (renderIcon ? renderIcon(Icon, { itemId }) : defaultIcon)}
      {title && <span>{title}</span>}
    </>
  );
}

export const SidebarItemsRenderer: React.FC<SidebarItemsRendererProps> = ({
  items,
  zone,
  styles,
  onNavigate,
  renderIcon,
  renderItemContent,
  LinkComponent,
}) => {
  const renderItems = React.useCallback(
    (nodes: SidebarItemConfig[], depth = 0) =>
      nodes.map((item) => {
        if (item.kind === "divider") {
          return <SidebarSeparator key={item.id} />;
        }

        if (item.kind === "label") {
          return (
            <SidebarGroupLabel key={item.id} className={styles?.sectionLabel}>
              {item.title}
            </SidebarGroupLabel>
          );
        }

        const isActive = !!item.current;
        const hasChildren = !!(item.children && item.children.length > 0);
        const Icon = item.icon;

      const content = renderItemContent ? (
          renderItemContent({
            id: item.id,
            title: item.title,
            href: item.href,
            isActive,
            defaultIcon: Icon ? (
              <Icon
                className={cn("h-4 w-4 mr-2", styles?.icon)}
                aria-hidden="true"
              />
            ) : null,
          })
        ) : (
          <DefaultContent
            Icon={Icon}
            title={item.title}
            isActive={isActive}
            renderIcon={renderIcon}
            styles={styles}
            itemId={item.id}
          />
        );

        // Keep structural flex layout here, but delegate typography, padding,
        // colors, and active styles entirely to styles.item/styles.itemActive
        // so that applications can fully control appearance.
        const commonButtonClasses = cn(
          "flex items-center rounded-md",
          styles?.item,
          isActive && styles?.itemActive,
        );

        if (item.kind === "section" || item.kind === "group") {
          return (
            <SidebarGroup key={item.id}>
              {item.title && (
                <SidebarGroupLabel className={styles?.sectionLabel}>
                  {item.title}
                </SidebarGroupLabel>
              )}
              <SidebarGroupContent>
                <SidebarMenu>
                  {item.children ? renderItems(item.children, depth + 1) : null}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          );
        }

        if (hasChildren) {
          return (
            <SidebarMenuItem key={item.id} data-testid={`menu-item-${item.id}`}>
              <SidebarMenuButton
                asChild
                isActive={isActive}
                className={commonButtonClasses}
              >
                <LinkComponent
                  to={item.href ?? "#"}
                  onClick={() => onNavigate?.(item.href ?? "")}
                >
                  {content}
                </LinkComponent>
              </SidebarMenuButton>

              <SidebarMenuSub>
                {item.children!.map((child) => {
                  const childActive = !!child.current;
                  const ChildIcon = child.icon;
                  const childContent = renderItemContent ? (
                    renderItemContent({
                      id: child.id,
                      title: child.title,
                      href: child.href,
                      isActive: childActive,
                      defaultIcon: ChildIcon ? (
                        <ChildIcon
                          className={cn("h-4 w-4 mr-2", styles?.icon)}
                          aria-hidden="true"
                        />
                      ) : null,
                    })
                  ) : (
                    <DefaultContent
                      Icon={ChildIcon}
                      title={child.title}
                      isActive={childActive}
                      renderIcon={renderIcon}
                      styles={styles}
                      itemId={child.id}
                    />
                  );

                  return (
                    <SidebarMenuSubItem key={child.id}>
                      <SidebarMenuSubButton
                        asChild
                        isActive={childActive}
                        className={commonButtonClasses}
                      >
                        <LinkComponent
                          to={child.href ?? "#"}
                          onClick={() => onNavigate?.(child.href ?? "")}
                        >
                          {childContent}
                        </LinkComponent>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  );
                })}
              </SidebarMenuSub>
            </SidebarMenuItem>
          );
        }

        return (
          <SidebarMenuItem key={item.id} data-testid={`menu-item-${item.id}`}>
            <SidebarMenuButton
              asChild
              isActive={isActive}
              className={commonButtonClasses}
            >
              <LinkComponent
                to={item.href ?? "#"}
                onClick={() => onNavigate?.(item.href ?? "")}
              >
                {content}
              </LinkComponent>
            </SidebarMenuButton>
          </SidebarMenuItem>
        );
      }),
    [LinkComponent, onNavigate, renderItemContent, renderIcon, styles],
  );

  return (
    <SidebarMenu data-zone={zone} role="menu" aria-label={`${zone} navigation`}>
      {renderItems(items)}
    </SidebarMenu>
  );
};
