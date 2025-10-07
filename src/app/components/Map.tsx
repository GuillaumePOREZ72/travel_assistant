"use client";

import React, { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import type { Map as LeafletMap, Marker } from "leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

interface MapProps {
  coordinates: [number, number] | null;
}

// Composant qui sera chargé uniquement côté client
const MapComponent = ({ coordinates }: MapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<LeafletMap | null>(null);
  const markerRef = useRef<Marker | null>(null);

  useEffect(() => {
    // Importer Leaflet uniquement côté client
    const initMap = async () => {
      const L = (await import("leaflet")).default;

      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
        iconUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/ marker-icon.png",
        shadowUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
      });

      if (process.env.NODE_ENV === "development") {
        console.log("Map - Coordinates: ", coordinates);
      }

      if (!coordinates) {
        return;
      }

      if (mapRef.current && !mapInstanceRef.current) {
        mapInstanceRef.current = L.map(mapRef.current, {
          center: coordinates,
          zoom: 13,
          zoomControl: true,
        });

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 19,
          minZoom: 2,
          attribution:
            '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(mapInstanceRef.current);

        markerRef.current = L.marker(coordinates).addTo(mapInstanceRef.current);
      } else if (mapInstanceRef.current && markerRef.current) {
        mapInstanceRef.current.setView(coordinates, 13);
        markerRef.current.setLatLng(coordinates);
      }
    };
    initMap();

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
        markerRef.current = null;
      }
    };
  }, [coordinates]);

  if (!coordinates) {
    return (
      <div className="h-60 w-full rounded-lg bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
        <p className="text-gray-500 dark:text-gray-400">
          Coordonnées non disponibles
        </p>
      </div>
    );
  }

  return <div ref={mapRef} className="h-60 w-full rounded-lg shadow-lg" />;
};

// Charger le composant dynamiquement avec ssr désactivé
const Map = dynamic(() => Promise.resolve(MapComponent), {
  ssr: false,
  loading: () => (
    <div className="h-60 w-full rounded-lg bg-gray-200 dark:bg-gray-700 animate-pulse flex items-center justify-center">
      <p className="text-gray-500 dark:text-gray-400">
        Chargement de la carte...
      </p>
    </div>
  ),
});

export default Map;
