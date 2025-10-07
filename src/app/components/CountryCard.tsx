"use client";

import { useState } from "react";
import CurrencyConverter from "./CurrencyConverter";
import { Country } from "../types";
import Image from "next/image";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("./Map"), {
  ssr: false,
  loading: () => (
    <div className="h-60 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center animate-pulse">
      <p className="text-gray-500 dark:text-gray-400">
        Chargement de la carte...
      </p>
    </div>
  ),
});

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

  // Récupérer les coordonnées
  let capitalCoordinates: [number, number] | null = null;

  if (
    country.capitalInfo?.latlng &&
    Array.isArray(country.capitalInfo.latlng)
  ) {
    capitalCoordinates = country.capitalInfo.latlng as [number, number];
  } else if (country.latlng && Array.isArray(country.latlng)) {
    capitalCoordinates = country.latlng as [number, number];
  }

  return (
    <motion.div
      variants={containerVariants}
      whileHover="hover"
      className="bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden transition-all duration-100 hover:shadow-xl"
    >
      {/* Drapeau */}
      <div className="relative w-full aspect-[3/2] bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
        {!imageError ? (
          <Image
            src={country.flags.png}
            alt={`Drapeau ${country.name.common}`}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={false}
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-gray-500 dark:text-gray-400">
              Image non disponible
            </span>
          </div>
        )}
      </div>

      {/* Contenu */}
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
            {country.timezones?.[0] || "N/A"}
          </p>
        </div>
        <div className="flex justify-center items-center">
          {country.currencies && (
            <button
              onClick={() => setShowConverter(!showConverter)}
              className="mt-4 px-4 py-2 bg-blue-500 dark:bg-blue-600 text-white rounded-2xl hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
            >
              {showConverter ? "Masquer" : "Afficher"} le convertisseur
            </button>
          )}
        </div>

        {showConverter && country.currencies && (
          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg transition-colors">
            <CurrencyConverter countryCurrency={country.currencies} />
          </div>
        )}

        {/* Carte */}
        <div className="mt-4">
          <Map
            coordinates={capitalCoordinates}
            cityName={country.capital?.[0]}
            countryName={country.name.common}
          />
        </div>
      </div>
    </motion.div>
  );
}
