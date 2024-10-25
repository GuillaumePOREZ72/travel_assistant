"use client";

import { useState, useEffect } from "react";
import CountryCard from "./components/CountryCard";
import SearchBar from "./components/SearchBar";
import Loading from "./components/Loading";
import { Country } from "./types";
import {Roboto} from 'next/font/google'

const roboto = Roboto({ subsets: ['latin'], weight:"400" });

/* This code block is defining a React functional component named `Home`. Here's a
breakdown of what it does: */
export default function Home() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  /* The `useEffect` hook in the provided code block is responsible for fetching
  data from an external API endpoint when the component mounts for the first
  time. Here's a breakdown of what it does: */
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

/**
 * The handleSearch function filters countries based on a search term and updates
 * the filtered countries state.
 * @param {string} searchTerm - The `searchTerm` parameter is a string that
 * represents the term that the user is searching for in the list of countries.
 */
  const handleSearch = (searchTerm: string): void => {
    const filtered = countries.filter((country) =>
      country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCountries(filtered);
  };

  return (
    <main className={`min-h-screen p-8 bg-gray-100 ${roboto.className}`}>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-blue-600">
          Travel Planner
        </h1>
        <SearchBar onSearch={handleSearch} />
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
