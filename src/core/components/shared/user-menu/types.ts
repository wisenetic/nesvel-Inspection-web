import type { LucideIcon } from "lucide-react";

export type UserMenuItem = {
  label: string;
  icon?: LucideIcon;
  action?: () => void;
  permission?: string; // If provided → check via useCan()
  danger?: boolean;
};

export type UserIdentity = {
  id: number | string;
  fullName: string;
  email: string;
  avatar?: string;
};
