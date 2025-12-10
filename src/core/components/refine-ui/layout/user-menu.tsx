// Deprecated: use src/components/user/user-menu.tsx instead.
// Kept temporarily for backwards-compat imports but unused in this app.
"use client";

import {
  useActiveAuthProvider,
  useLogout,
  useGetIdentity,
} from "@refinedev/core";
import { Activity, LogOut, Settings, User } from "lucide-react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/core/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/core/components/ui/dropdown-menu";
import { Skeleton } from "@/core/components/ui/skeleton";
import { cn } from "@/core/lib/utils";

type User = {
  id: number;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  avatar?: string;
};

const getInitials = (name = "") => {
  const names = name.split(" ");
  let initials = names[0]?.substring(0, 1).toUpperCase() ?? "";

  if (names.length > 1) {
    initials += names[names.length - 1]?.substring(0, 1).toUpperCase() ?? "";
  }
  return initials || "U";
};

const UserAvatar = () => {
  const { data: user, isLoading: userIsLoading } = useGetIdentity<User>();

  if (userIsLoading || !user) {
    return <Skeleton className={cn("h-10", "w-10", "rounded-full")} />;
  }

  const { fullName, avatar } = user;

  return (
    <Avatar className={cn("h-10", "w-10")}>
      {avatar && <AvatarImage src={avatar} alt={fullName} />}
      <AvatarFallback>{getInitials(fullName)}</AvatarFallback>
    </Avatar>
  );
};

export const UserMenu = () => {
  const { mutate: logout, isPending: isLoggingOut } = useLogout();
  const authProvider = useActiveAuthProvider();
  const { data: user, isLoading: userIsLoading } = useGetIdentity<User>();

  if (!authProvider?.getIdentity) {
    return null;
  }

  if (userIsLoading || !user) {
    return (
      <button
        type="button"
        className={cn(
          "flex items-center gap-2 rounded-full border border-transparent",
          "hover:border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-sidebar",
        )}
      >
        <Skeleton className={cn("h-10", "w-10", "rounded-full")} />
      </button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className={cn(
            "flex items-center justify-center rounded-full border border-transparent",
            "hover:border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-sidebar",
          )}
        >
          <UserAvatar />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        side="bottom"
        sideOffset={8}
        className="min-w-64 rounded-xl p-0"
      >
        {/* Header: avatar + name/email */}
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-3 px-4 pt-4 pb-3 text-left text-sm">
            <UserAvatar />
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">{user.fullName}</span>
              <span className="truncate text-xs text-muted-foreground">
                {user.email}
              </span>
            </div>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator className="my-1" />

        <DropdownMenuGroup className="px-1 py-1">
          <DropdownMenuItem className="flex items-center gap-3 px-4 py-2">
            <User className="size-4" />
            <span className="text-sm">Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center gap-3 px-4 py-2">
            <Settings className="size-4" />
            <span className="text-sm">Account Settings</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center gap-3 px-4 py-2">
            <Activity className="size-4" />
            <span className="text-sm">Activity Log</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator className="my-1" />

        <DropdownMenuItem
          className="flex items-center gap-3 px-4 py-2 text-sm text-destructive"
          onClick={() => {
            logout();
          }}
        >
          <LogOut className="size-4" />
          <span>{isLoggingOut ? "Signing out..." : "Sign Out"}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

UserMenu.displayName = "UserMenu";
