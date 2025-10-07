"use client";

import { useState, useEffect } from "react";
import CountryCard from "./components/CountryCard";
import SearchBar from "./components/SearchBar";
import Loading from "./components/Loading";
import { Country } from "./types";
import { Roboto, Poppins } from "next/font/google";
import DarkMode from "./components/DarkMode";

const roboto = Roboto({ subsets: ["latin"], weight: "400" });
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["700", "900"],
  display: "swap",
});
export default function Home() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const regions = ["Africa", "Americas", "Asia", "Europe", "Oceania"];

        const promises = regions.map((region) =>
          fetch(`https://restcountries.com/v3.1/region/${region}`).then(
            (res) => {
              if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
              }
              return res.json();
            }
          )
        );

        const results = await Promise.all(promises);

        // Fusionner tous les résultats en un seul tableau
        const allCountries = results.flat();

        // Vérifier que data est bien un tableau avant de l'utiliser
        if (Array.isArray(allCountries) && allCountries.length > 0) {
          setCountries(allCountries);
          setFilteredCountries(allCountries);
        } else {
          console.error("Aucun pays récupéré");
          setCountries([]);
          setFilteredCountries([]);
        }

        setLoading(false);
      } catch (error) {
        console.error("Erreur lors de la récupération des pays:", error);
        // En cas d'erreur, initialiser avec des tableaux vides
        setCountries([]);
        setFilteredCountries([]);
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
          <h1 className={`text-5xl font-bold text-blue-600 dark:text-blue-400 ${poppins.className}`}>
            Travel Currency Assistant
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
