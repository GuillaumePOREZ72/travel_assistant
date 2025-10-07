"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function DarkMode() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const isDark =
      savedTheme === "dark" ||
      (!savedTheme &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);

    setIsDarkMode(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
    document.documentElement.classList.toggle("dark", newMode);
  };

  return (
    <button
      onClick={toggleDarkMode}
      aria-label="Toggle dark mode"
      className="p-3 rounded-full hover:bg-blue-300 dark:hover:bg-gray-800 transition-colors"
    >
      {isDarkMode ? (
        <Sun className="h-7 w-7 text-yellow-400" />
      ) : (
        <Moon className="h-7 w-7 text-white" />
      )}
    </button>
  );
}
