import React, { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import type { Map as LeafletMap } from "leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

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
    if (coordinates && mapRef.current && !mapInstanceRef.current) {
      mapInstanceRef.current = L.map(mapRef.current).setView(coordinates, 13);

      if (apiKey) {
        L.tileLayer(
          `https://maps.googleapis.com/maps/api/staticmap?center=${coordinates[0]},${coordinates[1]}&zoom=13&size=600x400&maptype=roadmap&key=${apiKey}`
        ).addTo(mapInstanceRef.current);
      } else {
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: "© OpenStreetMap contributors",
        }).addTo(mapInstanceRef.current);
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
});

export default Map;
