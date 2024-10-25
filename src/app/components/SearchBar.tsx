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
        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}
