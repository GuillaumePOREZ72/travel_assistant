"use client";

import React from "react";
import { Search } from "lucide-react";

// The `interface SearchBarProps` is defining the type of props that the `SearchBar` component expects to receive. In this case, it specifies that the `SearchBar` component should receive a prop called `onSearch` which is a function that takes a `searchTerm` parameter of type `string` and returns `void` (i.e., does not return anything). This helps in type-checking and ensuring that the correct props are passed to the component.
interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
}

// This code snippet is defining a functional React component called `SearchBar` that takes a prop `onSearch` of type function as specified by the `SearchBarProps` interface.
export default function SearchBar({ onSearch }: SearchBarProps) {
  return (
    <div className="max-w-xl mx-auto relative">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500 dark:text-gray-400 pointer-events-none" />
        <input
          type="text"
          placeholder="Rechercher un pays..."
          onChange={(e) => onSearch(e.target.value)}
          className="w-full p-3 pl-12 rounded-xl
          bg-white/50 dark:bg-gray-800/50
          text-gray-800 dark:text-gray-100
          placeholder-gray-500 dark:placeholder-gray-400
          backdrop-blur-sm
          border-2 border-transparent
          focus:outline-none
          focus:ring-2  
          focus:ring-blue-500
          focus:border-blue-500
          dark:focus:ring-blue-400
          dark:focus:border-blue-400
          transition-all duration-200
          hover:bg-white/70 dark:hover:bg-gray-800/70"
        />
      </div>
    </div>
  );
}
