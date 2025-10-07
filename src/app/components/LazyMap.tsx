"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("./Map"), {
  ssr: false,
  loading: () => (
    <div className="h-60 bg-gray-200 dark:bg-gray-700 rounded-xl flex items-center justify-center">
      <p className="text-gray-500 dark:text-gray-400">
        Chargement de la carte...
      </p>
    </div>
  ),
});

interface LazyMapProps {
  coordinates: [number, number] | null;
  cityName?: string;
  countryName?: string;
}

import React from "react";

export default function LazyMap({
  coordinates,
  cityName,
  countryName,
}: LazyMapProps) {
  const [isVisible, setIsVisible] = useState(false);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );

    if (mapContainerRef.current) {
      observer.observe(mapContainerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={mapContainerRef} className="mt-4">
      {isVisible ? (
        <Map
          coordinates={coordinates}
          cityName={cityName}
          countryName={countryName}
        />
      ) : (
        <div className="h-60 bg-gray-100 dark:bg-gray-700 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600">
          <div className="text-center">
            <svg
              className="w-12 h-12 mx-auto text-gray-400 dark:text-gray-500 mb-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <p className="text-sm text-gray-400 dark: text-gray-500">
              Scrollez pour charger la carte
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
