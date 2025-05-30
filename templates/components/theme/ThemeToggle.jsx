"use client";

import { Button } from "@/components/ui/button";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import { useTheme } from "@/components/theme/ThemeProvider";

export function ThemeToggle({ size = "default", variant = "outline" }) {
  const { theme, toggleTheme, mounted } = useTheme();

  if (!mounted) {
    return (
      <Button variant={variant} size={size} className="w-9 h-9">
        <div className="w-4 h-4" />
      </Button>
    );
  }

  return (
    <Button
      variant={variant}
      size={size}
      onClick={toggleTheme}
      className="w-9 h-9"
      title={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
    >
      {theme === "light" ? (
        <MoonIcon className="w-4 h-4" />
      ) : (
        <SunIcon className="w-4 h-4" />
      )}
    </Button>
  );
}

export function ThemeSelect({ className }) {
  const { theme, setTheme, mounted } = useTheme();

  if (!mounted) {
    return (
      <select className={className} disabled>
        <option>Loading...</option>
      </select>
    );
  }

  return (
    <select
      className={className}
      value={theme}
      onChange={(e) => setTheme(e.target.value)}
    >
      <option value="light">Light</option>
      <option value="dark">Dark</option>
    </select>
  );
}
