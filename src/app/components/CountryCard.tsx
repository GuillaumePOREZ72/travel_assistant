import { useState } from "react";
import CurrencyConverter from "./CurrencyConverter";
import { Country } from "../types";
import Image from "next/image";

interface CountryCardProps {
  country: Country;
}

export default function CountryCard({ country }: CountryCardProps) {
  const [showConverter, setShowConverter] = useState<boolean>(false);
  const [imageError, setImageError] = useState<boolean>(false);

  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden
      transition-all duration-300 hover:shadow-xl"
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
          <div
            className="w-full h-full flex items-center justify-center 
            bg-gray-200 dark:bg-gray-700"
          >
            <span className="text-gray-500 dark:text-gray-400">
              Image non disponible
            </span>
          </div>
        )}
      </div>
      <div className="p-6">
        <h2
          className="text-2xl font-bold mb-4 text-gray-900 dark:text-white
          transition-colors"
        >
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
            className="mt-4 px-4 py-2 bg-blue-500 dark:bg-blue-600 
              text-white rounded-md 
              hover:bg-blue-600 dark:hover:bg-blue-700 
              transition-colors focus:outline-none focus:ring-2 
              focus:ring-blue-500 dark:focus:ring-blue-400 
              focus:ring-offset-2 dark:focus:ring-offset-gray-800"
          >
            {showConverter ? "Masquer" : "Afficher"} le convertisseur
          </button>
        )}

        {showConverter && country.currencies && (
          <div
            className="mt-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg 
            transition-colors"
          >
            <CurrencyConverter countryCurrency={country.currencies} />
          </div>
        )}
      </div>
    </div>
  );
}
