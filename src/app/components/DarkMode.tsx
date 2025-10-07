"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";


// Hook personnalisé pour l'initialisation côté client
const useClientSideValue = (key: string, initialValue: boolean) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    const storedValue = localStorage.getItem(key);
    if (storedValue !== null) {
      setValue(JSON.parse(storedValue));
    } else {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setValue(prefersDark);
    }
  }, [key]);

  return [value, setValue] as const;
};

const DarkMode = () => {
  const [dark, setDark] = useClientSideValue("dark-mode", false);

  // Effet pour synchroniser le thème avec le DOM
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("dark-mode", JSON.stringify(dark));
  }, [dark]);

  // Écoute des changements de préférence système
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      if (localStorage.getItem("dark-mode") === null) {
        setDark(e.matches);
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [setDark]);

  const toggleDark = () => setDark((prev) => !prev);

  return (
    <button
      onClick={toggleDark}
      aria-label={dark ? "Activer le mode clair" : "Activer le mode sombre"}
      className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      title={dark ? "Passer en mode clair" : "Passer en mode sombre"}
    >
      {dark ? <Sun className="h-5 w-5 text-white" /> : <Moon className="h-5 w-5" />}
    </button>
  );
};

export default DarkMode;
