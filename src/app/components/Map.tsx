"use client";

import React, { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import type { Map as LeafletMap } from "leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { log } from "console";

interface MapProps {
  coordinates: [number, number] | null;
}

// Composant qui sera chargé uniquement côté client
const MapComponent = ({ coordinates }: MapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<LeafletMap | null>(null);

  // Récupérer la clé API depuis les variables d'environnement
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  useEffect(() => {
     console.log(
      "Map useEffect: coordinates:", coordinates,
      "apiKey:", apiKey,
      "mapRef.current:", mapRef.current ? "exists" : "null",
      "mapInstanceRef.current:", mapInstanceRef.current ? "exists" : "null"
    );
    if (coordinates && mapRef.current && !mapInstanceRef.current) {
      console.log("Map useEffect: Initializing map with coordinates:", coordinates);
      mapInstanceRef.current = L.map(mapRef.current, {
        center: coordinates,
        zoom: 13,
        zoomControl: true, // Add zoom control
      });

      if (apiKey) {
        console.log("Map useEffect: Using Google Maps with API key");
        const googleLayer = L.tileLayer(
          `https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}&key=${apiKey}`,
          {
            maxZoom: 18,
            minZoom: 2,
            subdomains: ["mt0", "mt1", "mt2", "mt3"],
          }
        );
        googleLayer.addTo(mapInstanceRef.current);
      } else {
        console.log("Map useEffect: Using OpenStreetMap (no API key)");
        const osmLayer = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 19,
          minZoom: 2,
        });
        osmLayer.addTo(mapInstanceRef.current);
      }
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [coordinates, apiKey]);

  return <div ref={mapRef} className="h-60 w-full rounded-lg" />;
};

// Charger le composant dynamiquement avec ssr désactivé
const Map = dynamic(() => Promise.resolve(MapComponent), {
  ssr: false,
  loading: () =><p>Chargement de la carte...</p>
});

export default Map;
