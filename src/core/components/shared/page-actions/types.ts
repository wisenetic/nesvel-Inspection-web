import type { LucideIcon } from "lucide-react";

export type ActionItem = {
  id: string;
  label: string;
  icon?: LucideIcon | React.ReactNode;
  onClick?: () => void;
  danger?: boolean;
  visible?: boolean;
  disabled?: boolean;
  // optional permission key to check with useCan()
  permission?: string;
};
