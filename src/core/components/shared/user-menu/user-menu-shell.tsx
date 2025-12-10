"use client";

import {
  useGetIdentity,
  useLogout,
  useActiveAuthProvider,
} from "@refinedev/core";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuGroup,
} from "@/core/components/ui/dropdown-menu";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/core/components/ui/avatar";

import { Skeleton } from "@/core/components/ui/skeleton";
import { cn } from "@/core/lib/utils";

import type { UserMenuItem, UserIdentity } from "./types";

const getInitials = (name?: string) => {
  if (!name) return "U";
  const p = name.trim().split(" ");
  return (p[0][0] + (p[p.length - 1]?.[0] ?? "")).toUpperCase();
};

export const UserMenuShell = ({ items }: { items: UserMenuItem[] }) => {
  const auth = useActiveAuthProvider();
  const { mutate: logout } = useLogout();
  const { data: user, isLoading } = useGetIdentity<UserIdentity>();

  if (!auth?.getIdentity) return null;

  if (isLoading || !user) {
    return <Skeleton className="h-10 w-10 rounded-full" />;
  }

  // TODO: integrate permission-based filtering with a dedicated hook.
  // For now, we ignore `permission` and show all configured items.
  const availableItems = items;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className={cn(
            "flex items-center justify-center rounded-full border border-transparent",
            "hover:border-border focus-visible:ring-2 focus-visible:ring-ring",
          )}
        >
          <Avatar className="h-10 w-10">
            {user.avatar && (
              <AvatarImage src={user.avatar} alt={user.fullName} />
            )}
            <AvatarFallback>{getInitials(user.fullName)}</AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        side="bottom"
        sideOffset={8}
        className="min-w-64 rounded-xl p-0"
      >
        {/* User header */}
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-3 px-4 pt-4 pb-3 text-left">
            <Avatar className="h-10 w-10">
              {user.avatar && <AvatarImage src={user.avatar} />}
              <AvatarFallback>{getInitials(user.fullName)}</AvatarFallback>
            </Avatar>

            <div className="grid text-left leading-tight">
              <span className="truncate font-semibold">{user.fullName}</span>
              <span className="truncate text-xs text-muted-foreground">
                {user.email}
              </span>
            </div>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator className="my-1" />

        <DropdownMenuGroup className="px-1 py-1">
          {availableItems.map((item, i) => (
            <DropdownMenuItem
              key={i}
              onClick={item.action}
              className={cn(
                "flex items-center gap-3 px-4 py-2",
                item.danger && "text-destructive",
              )}
            >
              {item.icon && <item.icon className="size-4" />}
              <span>{item.label}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="flex items-center gap-3 px-4 py-2 text-destructive"
          onClick={() => logout()}
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
