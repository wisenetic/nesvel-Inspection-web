"use client";

import { Monitor, Moon, Sun } from "lucide-react";

import { Button } from "@/core/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/core/components/ui/dropdown-menu";
import type { Theme } from "@/core/providers/theme-provider";
import { useTheme } from "@/core/hooks/use-theme";
import { cn } from "@/core/lib/utils";

type ThemeToggleProps = {
  className?: string;
};

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();

  const handleChange = (value: Theme) => {
    setTheme(value ?? "system");
  };

  const renderIcon = () => {
    switch (theme) {
      case "dark":
        return <Moon className="h-[1.1rem] w-[1.1rem]" />;
      case "system":
        return <Monitor className="h-[1.1rem] w-[1.1rem]" />;
      case "light":
      default:
        return <Sun className="h-[1.1rem] w-[1.1rem]" />;
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "bg-transparent hover:bg-accent/60 rounded-full h-10 w-10",
            className,
          )}
        >
          {renderIcon()}
          <span className="sr-only">Open theme switcher</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-32">
        <DropdownMenuItem
          onClick={() => handleChange("light")}
          className={cn(
            theme === "light" && "bg-accent text-accent-foreground",
          )}
        >
          Light
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleChange("dark")}
          className={cn(theme === "dark" && "bg-accent text-accent-foreground")}
        >
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleChange("system")}
          className={cn(
            theme === "system" && "bg-accent text-accent-foreground",
          )}
        >
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

ThemeToggle.displayName = "ThemeToggle";
