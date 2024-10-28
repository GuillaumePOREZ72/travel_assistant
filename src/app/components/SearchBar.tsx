import React from "react";

// The `interface SearchBarProps` is defining the type of props that the `SearchBar` component expects to receive. In this case, it specifies that the `SearchBar` component should receive a prop called `onSearch` which is a function that takes a `searchTerm` parameter of type `string` and returns `void` (i.e., does not return anything). This helps in type-checking and ensuring that the correct props are passed to the component.
interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
}

// This code snippet is defining a functional React component called `SearchBar` that takes a prop `onSearch` of type function as specified by the `SearchBarProps` interface.
export default function SearchBar({ onSearch }: SearchBarProps) {
  return (
    <div className="max-w-xl mx-auto">
      <input
        type="text"
        placeholder="Rechercher un pays..."
        onChange={(e) => onSearch(e.target.value)}
        className="w-full p-3 rounded-lg
    bg-white/50 dark:bg-gray-800/50
    text-gray-800 dark:text-gray-100
    placeholder-gray-500 dark:placeholder-gray-400
    backdrop-blur-sm
    transition-all"
      />
    </div>
  );
}
