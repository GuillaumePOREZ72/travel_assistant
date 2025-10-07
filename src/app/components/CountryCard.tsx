"use client";

import { useState } from "react";
import CurrencyConverter from "./CurrencyConverter";
import { Country } from "../types";
import Image from "next/image";
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
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden transition-all duration-200 ease-out hover:scale-[1.02] hover:shadow-2xl will-change-transform">
      
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
            loading="lazy"
            quality={75}
            placeholder="blur"
            blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzAwIiBoZWlnaHQ9IjQ3NSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNzAwIiBoZWlnaHQ9IjQ3NSIgZmlsbD0iI2UwZTBlMCIvPjwvc3ZnPg=="
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
        <div className="mt-5">
          <Map
            coordinates={capitalCoordinates}
            cityName={country.capital?.[0]}
            countryName={country.name.common}
          />
        </div>
      </div>
    </div>
  );
}
