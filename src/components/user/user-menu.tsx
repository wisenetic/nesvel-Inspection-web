"use client";

import { UserMenuShell } from "@/core/components/shared/user-menu";
import { User, Settings, Activity } from "lucide-react";

export const UserMenu = () => {
  return (
    <UserMenuShell
      items={[
        {
          label: "Profile",
          icon: User,
          action: () => console.log("PROFILE"),
          permission: "user.profile.view",
        },
        {
          label: "Account Settings",
          icon: Settings,
          action: () => console.log("ACCOUNT SETTINGS"),
          permission: "user.settings.edit",
        },
        {
          label: "Activity Log",
          icon: Activity,
          action: () => console.log("ACTIVITY LOG"),
          permission: "user.activity.view",
        },
      ]}
    />
  );
};
