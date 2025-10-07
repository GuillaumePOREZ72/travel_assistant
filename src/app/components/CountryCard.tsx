"use client";

import { useState, useEffect } from "react";
import CurrencyConverter from "./CurrencyConverter";
import { Country } from "../types";
import Image from "next/image";
import { motion } from "framer-motion";
import Map from "./Map";
import axios from "axios";

interface CountryCardProps {
  country: Country;
}

const containerVariants = {
  hover: {
    scale: 1.02,
    boxShadow: "0px 0px 10px rgba(0,0,0,0.2)",
    transition: { duration: 0.1 },
  },
};

export default function CountryCard({ country }: CountryCardProps) {
  const [showConverter, setShowConverter] = useState<boolean>(false);
  const [imageError, setImageError] = useState<boolean>(false);
  const [capitalCoordinates, setCapitalCoordinates] = useState<
    [number, number] | null
  >(null);
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  console.log(`CountryCard for ${country.name.common} - API Key:`, apiKey); // Vérifier la clé API

  useEffect(() => {
    const capital = country.capital?.[0];
    console.log(`CountryCard for ${country.name.common} - Capital:`, capital); // Vérifier la capitale

    if (capital && apiKey) {
      console.log(
        `CountryCard for ${country.name.common} - Fetching coordinates for:`,
        capital
      );
      getCapitalCoordinates(capital, apiKey)
        .then((coords) => {
          console.log(
            `CountryCard for ${country.name.common} - Coordinates received:`,
            coords
          ); // Voir les coordonnées reçues
          setCapitalCoordinates(coords);
        })
        .catch((error) => {
          console.error(
            `CountryCard for ${country.name.common} - Error fetching coordinates:`,
            error
          );
        });
    } else {
      console.log(
        `CountryCard for ${
          country.name.common
        } - Not fetching coordinates. Capital: ${capital}, API Key present: ${!!apiKey}`
      );
    }
  }, [country.name.common, country.capital, apiKey]); // Ajout de country.name.common pour des logs plus clairs

  const getCapitalCoordinates = async (
    capital: string,
    apiKey: string
  ): Promise<[number, number] | null> => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          capital
        )}&key=${apiKey}`
      );
      if (response.data.results && response.data.results.length > 0) {
        const location = response.data.results[0].geometry.location;
        return [location.lat, location.lng];
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error fetching coordinates:", error);
      return null;
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      whileHover="hover"
      className="bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden transition-all duration-100 hover:shadow-xl"
    >
      <div className="relative w-full h-40">
        {!imageError ? (
          <Image
            src={country.flags.png}
            alt={`Drapeau ${country.name.common}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={false}
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-700">
            <span className="text-gray-500 dark:text-gray-400">
              Image non disponible
            </span>
          </div>
        )}
      </div>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white transition-colors">
          {country.name.common}
        </h2>
        <div className="space-y-2">
          <p className="text-gray-600 dark:text-gray-300">
            <span className="font-semibold">Capitale:</span>{" "}
            {country.capital?.[0] || "N/A"}
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            <span className="font-semibold">Région:</span> {country.region}
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            <span className="font-semibold">Monnaie:</span>{" "}
            {country.currencies
              ? Object.entries(country.currencies)
                  .map(([, curr]) => `${curr.name} (${curr.symbol})`)
                  .join(", ")
              : "N/A"}
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            <span className="font-semibold">Langues:</span>{" "}
            {country.languages
              ? Object.values(country.languages).join(", ")
              : "N/A"}
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            <span className="font-semibold">Fuseau horaire:</span>{" "}
            {country.timezones[0]}
          </p>
        </div>

        {country.currencies && (
          <button
            onClick={() => setShowConverter(!showConverter)}
            className="mt-4 px-4 py-2 mb-6 bg-blue-500 dark:bg-blue-600 text-white rounded-md hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
          >
            {showConverter ? "Masquer" : "Afficher"} le convertisseur
          </button>
        )}

        {showConverter && country.currencies && (
          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg transition-colors">
            <CurrencyConverter countryCurrency={country.currencies} />
          </div>
        )}
        <Map coordinates={capitalCoordinates} />
      </div>
    </motion.div>
  );
}
