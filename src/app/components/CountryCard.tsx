import { useState } from "react";
import CurrencyConverter from "./CurrencyConverter";
import { Country } from "../types";
import Image from "next/image";

/* The `interface CountryCardProps` is defining the structure of the props that the
`CountryCard` component expects to receive. In this case, it specifies that the
`CountryCard` component should receive a prop named `country` of type `Country`.
This helps in type-checking and ensuring that the correct props are passed to
the component. */
interface CountryCardProps {
  country: Country;
}

/* This code defines a React functional component called `CountryCard` that takes a
`country` object as a prop. Inside the component, it renders a card displaying
information about the country, such as its name, capital, region, currency,
languages, and timezone. */
export default function CountryCard({ country }: CountryCardProps) {
  const [showConverter, setShowConverter] = useState<boolean>(false);
  const [imageError, setImageError] = useState<boolean>(false);

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
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
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <span className="text-gray-500">Image non disponible</span>
          </div>
        )}
      </div>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">{country.name.common}</h2>
        <div className="space-y-2">
          <p className="text-gray-600">
            <span className="font-semibold">Capitale:</span>{" "}
            {country.capital?.[0] || "N/A"}
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Région:</span> {country.region}
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Monnaie:</span>{" "}
            {country.currencies
              ? Object.entries(country.currencies)
                  .map(([, curr]) => `${curr.name} (${curr.symbol})`)
                  .join(", ")
              : "N/A"}
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Langues:</span>{" "}
            {country.languages
              ? Object.values(country.languages).join(", ")
              : "N/A"}
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Fuseau horaire:</span>{" "}
            {country.timezones[0]}
          </p>
        </div>

        {country.currencies && (
          <button
            onClick={() => setShowConverter(!showConverter)}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            {showConverter ? "Masquer" : "Afficher"} le convertisseur
          </button>
        )}

        {showConverter && country.currencies && (
          <CurrencyConverter countryCurrency={country.currencies} />
        )}
      </div>
    </div>
  );
}
