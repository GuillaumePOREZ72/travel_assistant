"use client";

import { useState, useEffect } from "react";
import CountryCard from "./components/CountryCard";
import SearchBar from "./components/SearchBar";
import Loading from "./components/Loading";
import { Country } from "./types";
import { Roboto } from "next/font/google";
import DarkMode from "./components/DarkMode";


const roboto = Roboto({ subsets: ["latin"], weight: "400" });

export default function Home() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data: Country[] = await response.json();
        setCountries(data);
        setFilteredCountries(data);
        setLoading(false);
      } catch (error) {
        console.error("Erreur lors de la récupération des pays:", error);
        setLoading(false);
      }
    };
    fetchCountries();
  }, []);

  const handleSearch = (searchTerm: string): void => {
    const filtered = countries.filter((country) =>
      country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCountries(filtered);
  };

  return (
    <main
      className={`min-h-screen transition-all duration-300 ease-in-out
        bg-light-gradient dark:bg-dark-gradient ${roboto.className}`}
    >
      <div className="max-w-7xl mx-auto p-8 backdrop-blur-sm dark:backdrop-blur-md">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-5xl font-bold text-center text-blue-600 dark:text-blue-400 transition-colors">
            Currency Assistant
          </h1>
          <DarkMode />
        </div>

        <div className="backdrop-blur-sm bg-white/30 dark:bg-gray-900/30 rounded-lg p-4 transition-all">
          <SearchBar onSearch={handleSearch} />
        </div>

        {loading ? (
          <Loading />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {filteredCountries.map((country) => (
              <CountryCard key={country.cca3} country={country} />
            ))}
          </div>
        )}
        
      </div>
    </main>
  );
}
