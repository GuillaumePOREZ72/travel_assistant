"use client";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useLocalStorage } from "react-use";

const DarkMode = () => {
  const [storedValue, setStoredValue] = useLocalStorage<boolean>(
    "dark-mode",
    undefined
  );
  const [dark, setDark] = useState(() => {
    // Initialisation avec la valeur stockée ou la préférence système
    if (typeof window === "undefined") return true;
    if (storedValue !== undefined) return storedValue;
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  // Effet pour synchroniser le thème avec le DOM
  useEffect(() => {
    if (typeof window !== "undefined") {
      document.documentElement.classList.toggle("dark", dark);
      setStoredValue(dark);
    }
  }, [dark, setStoredValue]);

  // Écoute des changements de préférence système
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      if (storedValue === undefined) {
        setDark(e.matches);
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [storedValue]);

  const toggleDark = () => setDark((prev) => !prev);

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
