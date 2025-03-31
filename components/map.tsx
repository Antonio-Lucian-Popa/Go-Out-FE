'use client';

import { useState, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import { Location, MapBounds } from '@/types';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { debounce } from 'lodash';

// Fix for default marker icons
const DefaultIcon = L.icon({
  iconUrl: '/leaflet/marker-icon.png',
  iconRetinaUrl: '/leaflet/marker-icon-2x.png',
  shadowUrl: '/leaflet/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

interface MapProps {
  locations: Location[];
  onBoundsChange?: (bounds: MapBounds) => void;
}

function MapEventHandler({ onBoundsChange }: { onBoundsChange: (bounds: MapBounds) => void }) {
  const map = useMapEvents({
    moveend: () => {
      const bounds = map.getBounds();
      const zoom = map.getZoom();
      onBoundsChange({
        north: bounds.getNorth(),
        south: bounds.getSouth(),
        east: bounds.getEast(),
        west: bounds.getWest(),
        zoom
      });
    },
    zoomend: () => {
      const bounds = map.getBounds();
      const zoom = map.getZoom();
      onBoundsChange({
        north: bounds.getNorth(),
        south: bounds.getSouth(),
        east: bounds.getEast(),
        west: bounds.getWest(),
        zoom
      });
    }
  });
  return null;
}

export default function Map({ locations: initialLocations, onBoundsChange }: MapProps) {
  const [locations, setLocations] = useState<Location[]>(initialLocations);
  const center = locations[0]
    ? [locations[0].latitude, locations[0].longitude]
    : [44.4268, 26.1025]; // București default

  const debouncedBoundsChange = useCallback(
    debounce((bounds: MapBounds) => {
      if (onBoundsChange) {
        onBoundsChange(bounds);
      }
    }, 300),
    [onBoundsChange]
  );

  return (
    <MapContainer
      center={[center[0], center[1]] as [number, number]}
      zoom={13}
      scrollWheelZoom={true}
      className="w-full h-full rounded-lg"
      minZoom={3}
      maxZoom={18}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapEventHandler onBoundsChange={debouncedBoundsChange} />
      {locations.map((location) => (
        <Marker
          key={location.id}
          position={[location.latitude, location.longitude]}
        >
          <Popup>
            <div className="p-2 max-w-xs">
              {location.imageUrl && (
                <img 
                  src={location.imageUrl} 
                  alt={location.name}
                  className="w-full h-32 object-cover rounded-lg mb-2"
                />
              )}
              <h3 className="font-semibold text-lg">{location.name}</h3>
              <p className="text-sm text-gray-600 mb-1">{location.address}</p>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-yellow-500">★</span>
                <span className="text-sm">{location.rating.toFixed(1)}</span>
                <span className="text-sm text-gray-500">({location.popularity} visits)</span>
              </div>
              {location.tags && location.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-1">
                  {location.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              {location.openingHours && (
                <p className="text-sm text-gray-600 mt-1">{location.openingHours}</p>
              )}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}