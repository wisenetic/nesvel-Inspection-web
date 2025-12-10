"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import React from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/core/components/ui/select";
import { useTheme } from "@/core/hooks/use-theme";
import { cn } from "@/core/lib/utils";

type ThemeOption = {
  value: "light" | "dark" | "system";
  label: string;
  icon: React.ReactNode;
};

const themeOptions: ThemeOption[] = [
  {
    value: "light",
    label: "Light",
    icon: <Sun className="h-4 w-4" />,
  },
  {
    value: "dark",
    label: "Dark",
    icon: <Moon className="h-4 w-4" />,
  },
  {
    value: "system",
    label: "System",
    icon: <Monitor className="h-4 w-4" />,
  },
];

export function ThemeSelect() {
  const { theme, setTheme } = useTheme();

  return (
    <Select
      value={theme}
      onValueChange={(value) => {
        setTheme(value as "light" | "dark" | "system");
      }}
    >
      <SelectTrigger
        className={cn(
          "h-8 w-[120px] md:w-[160px]",
          "border-border bg-background text-xs md:text-sm",
        )}
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="w-[160px]">
        {themeOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            <span className="flex items-center gap-2">
              {option.icon}
              {option.label}
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

ThemeSelect.displayName = "ThemeSelect";
