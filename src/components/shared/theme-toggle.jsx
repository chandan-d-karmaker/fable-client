"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Button } from "@heroui/react";
import { Sun, Moon } from "lucide-react";

export default function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // Ensure component is mounted on the client before rendering theme-dependent UI
  useEffect(() => {
    // eslint-disable-next-line
    setMounted(true);
  }, []);

  // Return a placeholder button of the exact same size to prevent layout shift during hydration
  if (!mounted) {
    return (
      <Button 
        isIconOnly 
        variant="light" 
        aria-label="Loading theme..." 
        className="w-10 h-10" 
      />
    );
  }

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <Button
      isIconOnly
      variant="light" // 'light' gives it a clean, text-like background behavior on hover
      aria-label="Toggle theme"
      onPress={toggleTheme}
      className="text-default-500 hover:text-default-900"
    >
      {theme === "light" ? (
        <Moon className="w-5 h-5 transition-transform hover:-rotate-12" />
      ) : (
        <Sun className="w-5 h-5 transition-transform hover:rotate-12" />
      )}
    </Button>
  );
}