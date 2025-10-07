"use client";

import React, { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import type { Map as LeafletMap, Marker } from "leaflet";
import "leaflet/dist/leaflet.css";

interface MapProps {
  coordinates: [number, number] | null;
  cityName?: string;
  countryName?: string;
}

// Composant qui sera chargé uniquement côté client
const MapComponent = ({ coordinates, cityName, countryName }: MapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<LeafletMap | null>(null);
  const markerRef = useRef<Marker | null>(null);

  useEffect(() => {
    // Importer Leaflet uniquement côté client
    const initMap = async () => {
      if (!coordinates || !mapRef.current) return;

      const L = (await import("leaflet")).default;

      // Configuration des icônes Leaflet (obligatoire pour Next.js)
      if (typeof window !== "undefined") {
        delete (L.Icon.Default.prototype as any)._getIconUrl;
        L.Icon.Default.mergeOptions({
          iconRetinaUrl:
            "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
          iconUrl:
            "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
          shadowUrl:
            "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
        });
      }

      if (process.env.NODE_ENV === "development") {
        console.log("Map - Coordinates: ", coordinates);
      }

      if (!coordinates) {
        return;
      }

      if (mapRef.current) {
        mapInstanceRef.current = L.map(mapRef.current, {
          center: coordinates,
          zoom: 10,
          zoomControl: true,
          scrollWheelZoom: true,
        });

        // Ajouter les tuiles OpenStreetMap
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 19,
          minZoom: 2,
        }).addTo(mapInstanceRef.current);

        // Créer le marqueur avec popup
        const popupContent =
          cityName && countryName
            ? `<div style="text-align: center; padding: 8px;">
        <strong style="font-size: 16px; color: #3b82f6; display: block; margin-bottom: 4px;">${cityName}</strong><br/>
        <span style="color: #6b7280; font-size: 14px">${countryName}</span>
      </div>`
            : `<div style="text-align: center; padding: 8px;">
        <strong style="font-size: 14px;">Emplacement</strong>
      </div>`;

        markerRef.current = L.marker(coordinates, {
          title: cityName || "Capitale",
        })
          .addTo(mapInstanceRef.current)
          .bindPopup(popupContent, {
            closeButton: true,
            autoClose: false,
            className: "custom-popup",
          })
          .openPopup(); // Ouvre automatiquement le popup

        // Ajuster la vue pour centrer sur le marqueur
        mapInstanceRef.current.setView(coordinates, 10);
      } else if (mapInstanceRef.current && markerRef.current) {
        mapInstanceRef.current.setView(coordinates, 10);
        markerRef.current.setLatLng(coordinates);

        // Mettre à jour le popup
        const popupContent =
          cityName || countryName
            ? `<div style="text-align: center; padding: 8px;">
          <strong style="font-size: 16px; color: #3b82f6; display: block; margin-bottom: 4px;">${cityName}</strong>
          <span style="color: #6b7280; font-size: 14px;">${countryName}</span>
        </div>`
            : `<div style="text-align: center; padding: 8px;">
          <strong style="font-size: 14px;">Emplacement</strong>
        </div>`;

        markerRef.current.setPopupContent(popupContent).openPopup();
      }
    };
    initMap();

    // Cleanup
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
        markerRef.current = null;
      }
    };
  }, [coordinates, cityName, countryName]);

  if (!coordinates) {
    return (
      <div className="h-60 w-full rounded-lg bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
        <p className="text-gray-500 dark:text-gray-400">
          📍 Coordonnées non disponibles
        </p>
      </div>
    );
  }

  return (
    <div
      ref={mapRef}
      className="h-60 w-full rounded-lg shadow-lg border-2 border-gray-200 dark:border-gray-700"
    />
  );
};

// Charger le composant dynamiquement avec ssr désactivé
const Map = dynamic(() => Promise.resolve(MapComponent), {
  ssr: false,
  loading: () => (
    <div className="h-60 w-full rounded-lg bg-gray-200 dark:bg-gray-700 animate-pulse flex items-center justify-center">
      <div className="flex flex-col items-center gap-2">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-500 dark:text-gray-400">
          Chargement de la carte...
        </p>
      </div>
    </div>
  ),
});

export default Map;
