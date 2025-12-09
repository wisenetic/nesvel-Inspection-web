// src/core/layout/header/header.tsx
import React from "react";
import { Menu, MenuItem } from "@/core/components/ui/menu"; // optional, replace if not present
import { Button } from "@/core/components/ui/button";
import { Avatar } from "@/core/components/ui/avatar";
import { SunIcon, MoonIcon, LogOut, Bell } from "lucide-react";
import { SidebarTrigger } from "@/core/components/ui/sidebar";
import { useNavigate } from "react-router";

/**
 * Header - top navigation, contains:
 * - mobile hamburger (toggles sidebar)
 * - breadcrumbs placeholder (optional)
 * - search placeholder (optional)
 * - project title / brand
 * - quick actions (notifications)
 * - theme toggle
 * - user avatar menu
 */
export const Header: React.FC = () => {
  const navigate = useNavigate();

  const [isDark, setIsDark] = React.useState(false);

  React.useEffect(() => {
    // keep system simple: store theme in localStorage
    const s = localStorage.getItem("theme") === "dark";
    setIsDark(s);
    document.documentElement.classList.toggle("dark", s);
  }, []);

  const toggleTheme = React.useCallback(() => {
    const next = !isDark;
    setIsDark(next);
    localStorage.setItem("theme", next ? "dark" : "light");
    document.documentElement.classList.toggle("dark", next);
  }, [isDark]);

  const onLogout = () => {
    // replace with your auth logout flow
    // e.g. auth.signOut(); navigate("/login");
    navigate("/logout");
  };

  return (
    <header className="w-full border-b bg-white dark:bg-slate-900 dark:border-slate-800">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-3 flex items-center gap-4">
        {/* Left: hamburger + brand */}
        <div className="flex items-center gap-3">
          <SidebarTrigger
            className="md:hidden"
            aria-label="Open sidebar"
          />

          <div className="flex items-baseline gap-2">
            <h1 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              IMS
            </h1>
            <span className="text-sm text-slate-500 dark:text-slate-400">
              {" "}
              / layout
            </span>
          </div>
        </div>

        {/* Middle: placeholder for breadcrumb or search */}
        <div className="flex-1">
          {/* Breadcrumb or search can live here */}
          <div className="hidden md:flex items-center h-10 rounded bg-slate-50 dark:bg-slate-800 px-3 text-sm text-slate-500">
            {/* placeholder */}
          </div>
        </div>

        {/* Right: actions */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" aria-label="Notifications">
            <Bell className="w-4 h-4" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {isDark ? (
              <SunIcon className="w-4 h-4" />
            ) : (
              <MoonIcon className="w-4 h-4" />
            )}
          </Button>

          <div className="relative">
            <button
              className="flex items-center gap-2 px-2 py-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="User menu"
              onClick={() => navigate("/profile")}
            >
              <Avatar>
                <span>GM</span>
              </Avatar>
              <div className="hidden md:flex flex-col text-left">
                <span className="text-sm font-medium">gaurav marsoniya</span>
                <span className="text-xs text-slate-500">Project Manager</span>
              </div>
            </button>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={onLogout}
            aria-label="Sign out"
          >
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
