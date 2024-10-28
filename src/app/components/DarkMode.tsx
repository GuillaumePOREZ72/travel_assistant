"use client";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useLocalStorage } from "react-use";

/**
 * A button that toggles the app's color scheme between light and dark modes.
 * The preference is stored in local storage and respects system preferences.
 *
 * @returns A button containing a Moon or Sun icon that can be clicked to toggle
 *   the color scheme.
 */
const DarkMode = () => {
  const [dark, setDark] = useState(false);
  const [value, setValue] = useLocalStorage<boolean>("dark-mode", undefined);

  // Check system preferences on mount
  useEffect(() => {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    if (value === undefined) {
      setDark(prefersDark);
      setValue(prefersDark);
    } else {
      setDark(value);
    }
  }, [setValue, value]);

  // Listen for system preference changes
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      if (value === undefined) {
        setDark(e.matches);
        setValue(e.matches);
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [setValue, value]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      document.documentElement.classList.toggle("dark", dark);
    }
    setValue(dark);
  }, [dark, setValue]);

  const toggleDark = () => setDark(!dark);

  return (
    <button
      onClick={toggleDark}
      aria-label={dark ? "Activer le mode clair" : "Activer le mode sombre"}
      className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      title={dark ? "Passer en mode clair" : "Passer en mode sombre"}
    >
      {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </button>
  );
};

export default DarkMode;
